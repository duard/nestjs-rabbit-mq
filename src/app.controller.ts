import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(data: Record<string, unknown>) {
    return this.appService.handleMessagePrinted(data);
  }
}
