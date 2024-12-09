import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDataGoogleDto } from './dto/auth-data-google.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express'
import ms from "ms";
export type Payload = {
    userId: number,
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
        const payload: Payload = { userId: user.id, role: user.role };
        //create refresh token
        const refreshToken = this.createRefreshToken(payload)
        // update refresh token in db
        await this.usersService.updateRefreshToken(refreshToken, user.id)
        // attach cookies
        const refreshTokenExpire = this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN')
        response.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: refreshTokenExpire ?
                ms(refreshTokenExpire) * 2 : ms('1d') * 2
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

    refreshAccessToken = async (oldToken: string, response: Response) => {
        try {
            let check: Payload = this.jwtService.verify(oldToken, {
                secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET') ?? 'justasecret'
            })
            const user = await this.usersService.findOne(check.userId);
            //nếu người dùng chưa tồn tại, tiến hành create new
            if (!user) {
                throw new BadRequestException(`Không tìm thấy user với id = ${check.userId}`)
            }
            return this.getToken(user, response)
        } catch (error) {
            throw new BadRequestException('Refresh token không hợp. Vui lòng đăng nhập!')
        }
    }
}
