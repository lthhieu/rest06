import { Injectable } from '@nestjs/common';
import { AuthDataGoogleDto } from './dto/auth-data-google.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService
    ) { }
    async loginWithGoogle(data: AuthDataGoogleDto): Promise<any> {
        const { email, image, name } = data
        const user = await this.usersService.findOneByEmail(email);
        //nếu người dùng chưa tồn tại, tiến hành create new
        if (!user) {
            const newUser = await this.usersService.createWithGoogle(data);
            return this.getTokenWithGoogle(newUser)
        }
        //nếu đã ồn tại, thì trả về thông tin user
        return this.getTokenWithGoogle(user)
    }

    async getTokenWithGoogle(user: any) {
        const payload = { username: user.fullName, sub: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
