import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private configService: ConfigService) { }
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET') ?? 'justasecret',
      signOptions: { expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN') ?? '60s' },
    };
  }
}