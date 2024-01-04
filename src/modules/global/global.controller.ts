import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { GlobalService } from './global.service';

@Controller()
export class GlobalController {
  constructor(private readonly globalService: GlobalService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  checkStatus(): string {
    return this.globalService.checkStatus();
  }
}
