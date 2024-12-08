import { BadRequestException, Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService, Payload } from './auth.service';
import { AuthDataGoogleDto } from './dto/auth-data-google.dto';
import { Public } from 'src/configs/decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from 'src/configs/decorators/user.decorator';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { ResponseMessage } from 'src/configs/decorators/response_message.decorator';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('login-with-google')
    @ResponseMessage('Đăng nhập thành công')
    getTokenByGoogle(@Body() data: AuthDataGoogleDto, @Res({ passthrough: true }) response: Response) {
        return this.authService.loginWithGoogle(data, response);
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @ResponseMessage('Đăng nhập thành công')
    @Post('login')
    async login(@User() user: Omit<UserEntity, "password">, @Res({ passthrough: true }) response: Response) {
        return this.authService.getToken(user, response)
    }

    @ResponseMessage('Thông tin người dùng')
    @Get('account')
    async getAccount(@User() user: Payload) {
        return { userInfo: user }
    }

    @Public()
    @ResponseMessage('Làm mới access token')
    @Get('refresh')
    async refreshAccessToken(@Req() request: Request) {
        if (request.cookies['refresh_token']) {
            return this.authService.refreshAccessToken(request.cookies['refresh_token'])
        }
        throw new BadRequestException('Không có refresh token ở cookies')
    }
}
