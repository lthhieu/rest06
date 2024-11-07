import { Injectable } from '@nestjs/common';
import { AuthDataGoogleDto } from './dto/auth-data-google.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }
    async getTokenByGoogle(data: AuthDataGoogleDto): Promise<any> {
        const { email, image, name } = data
        const user = await this.usersService.findOneByEmail(email);
        //nếu người dùng chưa tồn tại, tiến hành create new
        if (!user) {
            const newUser = await this.usersService.createWithGoogle(data);
            return {
                success: true,
                data: newUser,
                message: 'tạo user thành công'
            }
        }
        //nếu đã ồn tại, thì trả về thông tin user
        return {
            success: true,
            data: user,
            message: 'đăng nhập thành công'
        }
    }
}
