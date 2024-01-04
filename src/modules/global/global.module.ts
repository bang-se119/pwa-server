import { Module } from '@nestjs/common';
import { GlobalController } from './global.controller';
import { GlobalService } from './global.service';

@Module({
  imports: [],
  controllers: [GlobalController],
  providers: [GlobalService],
})
export class GlobalModule {}
