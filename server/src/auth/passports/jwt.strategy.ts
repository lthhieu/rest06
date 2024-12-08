
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Payload } from '../auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService,
        private usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET') ?? 'justasecret',
        });
    }

    async validate(payload: Payload) {
        const user = await this.usersService.findOne(payload.userId)
        if (user)
            return { id: user.id, name: user.fullName, email: user.email, phone: user.phone, role: user.role, image: user.avatar }
        else
            throw new BadRequestException(`Không tìm thấy người dùng với id = ${payload.userId}`)

    }
}