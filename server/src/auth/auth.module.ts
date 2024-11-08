import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from 'src/configs/jwt/jwt.config.service';
import { JwtStrategy } from './passports/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
