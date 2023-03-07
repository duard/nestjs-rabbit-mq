import { Injectable } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Injectable()
export class AppService {
  @EventPattern('message_printed')
  async handleMessagePrinted(data: Record<string, unknown>) {
    console.log(`RABBIT : `, data.text);
  }
}
