import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './configs/databases/config.service';
import { PricingsModule } from './pricings/pricings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    UsersModule,
    PricingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
