import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) { }
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get('DATABASE_HOST') ?? 'localhost',
            port: this.configService.get('DATABASE_PORT') ?? 5432,
            username: this.configService.get('DATABASE_USERNAME') ?? 'postgres',
            password: this.configService.get('DATABASE_PASSWORD') ?? 'root',
            database: this.configService.get('DATABASE_NAME') ?? 'test',
            entities: ['dist/**/**/*.entity{.ts,.js}'],
            synchronize: true,
        };
    }
}
