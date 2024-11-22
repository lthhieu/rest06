import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDataGoogleDto } from './dto/auth-data-google.dto';
import { Public } from 'src/configs/decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from 'src/configs/decorators/user.decorator';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { ResponseMessage } from 'src/configs/decorators/response_message.decorator';

@Public()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login-with-google')
    @ResponseMessage('Đăng nhập thành công')
    getTokenByGoogle(@Body() data: AuthDataGoogleDto) {
        return this.authService.loginWithGoogle(data);
    }

    @UseGuards(LocalAuthGuard)
    @ResponseMessage('Đăng nhập thành công')
    @Post('login')
    async login(@User() user: Omit<UserEntity, "password">) {
        return this.authService.getToken(user)
    }
}
