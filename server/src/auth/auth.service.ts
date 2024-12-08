import { Injectable } from '@nestjs/common';
import { AuthDataGoogleDto } from './dto/auth-data-google.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express'
import ms from "ms";
export type Payload = {
    userId: number;
    name: string,
    email: string,
    phone: string,
    image: string,
    role: string
};

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        let user: User = null
        if (username.includes('@')) {
            user = await this.usersService.findOneByEmail(username);
        } else {
            user = await this.usersService.findOneByPhone(username);
        }
        if (user && user.password && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async loginWithGoogle(data: AuthDataGoogleDto, response: Response): Promise<any> {
        const { email, image, name } = data
        const user = await this.usersService.findOneByEmail(email);
        //nếu người dùng chưa tồn tại, tiến hành create new
        if (!user) {
            const newUser = await this.usersService.createWithGoogle(data);
            return this.getToken(newUser, response)
        }
        //nếu đã ồn tại, thì trả về thông tin user
        return this.getToken(user, response)
    }

    async getToken(user: Omit<User, "password">, response: Response) {
        const payload: Payload = { userId: user.id, role: user.role, email: user.email, name: user.fullName, phone: user.phone, image: user.avatar };
        //create refresh token
        const refreshToken = this.createRefreshToken(payload)
        // update refresh token in db
        await this.usersService.updateRefreshToken(refreshToken, user.id)
        // attach cookies
        response.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN')) ?? ms('1d')
        })
        return {
            access_token: this.jwtService.sign(payload),
            userInfo: {
                id: user.id,
                name: user.fullName,
                email: user.email,
                phone: user.phone,
                role: user.role,
                image: user.avatar
            }
        };
    }

    createRefreshToken = (payload: Payload) => {
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET') ?? 'justasecret',
            expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN') ?? '1d'
        })
        return refreshToken
    }
}
