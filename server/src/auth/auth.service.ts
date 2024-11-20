import { Injectable } from '@nestjs/common';
import { AuthDataGoogleDto } from './dto/auth-data-google.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export type Payload = {
    userId: number;
    role: string
};

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService
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

    async loginWithGoogle(data: AuthDataGoogleDto): Promise<any> {
        const { email, image, name } = data
        const user = await this.usersService.findOneByEmail(email);
        //nếu người dùng chưa tồn tại, tiến hành create new
        if (!user) {
            const newUser = await this.usersService.createWithGoogle(data);
            return this.getToken(newUser)
        }
        //nếu đã ồn tại, thì trả về thông tin user
        return this.getToken(user)
    }

    async getToken(user: Omit<User, "password">) {
        const payload: Payload = { userId: user.id, role: user.role };
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
}
