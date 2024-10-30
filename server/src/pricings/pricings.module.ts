import { Module } from '@nestjs/common';
import { PricingsService } from './pricings.service';
import { PricingsController } from './pricings.controller';

@Module({
  controllers: [PricingsController],
  providers: [PricingsService],
})
export class PricingsModule {}
