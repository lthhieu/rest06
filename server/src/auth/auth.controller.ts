import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDataGoogleDto } from './dto/auth-data-google.dto';
import { Public } from 'src/configs/decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Public()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login-with-google')
    getTokenByGoogle(@Body() data: AuthDataGoogleDto) {
        return this.authService.loginWithGoogle(data);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.getToken(req.user)
    }
}
