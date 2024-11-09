import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDataGoogleDto } from './dto/auth-data-google.dto';
import { Public } from 'src/configs/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('login-with-google')
    getTokenByGoogle(@Body() data: AuthDataGoogleDto) {
        return this.authService.loginWithGoogle(data);
    }
}
