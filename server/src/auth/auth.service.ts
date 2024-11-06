import { Injectable } from '@nestjs/common';
import { AuthDataGoogleDto } from './dto/auth-data-google.dto';

@Injectable()
export class AuthService {
    async getTokenByGoogle(data: AuthDataGoogleDto) {
        const { email, image, name } = data
        return {
            email, image, name
        }
    }
}
