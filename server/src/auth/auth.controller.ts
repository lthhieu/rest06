import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDataGoogleDto } from './dto/auth-data-google.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('login-with-google')
    getTokenByGoogle(@Body() data: AuthDataGoogleDto) {
        return this.authService.loginWithGoogle(data);
    }
}
