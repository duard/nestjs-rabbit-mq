import { Injectable } from '@nestjs/common';
type InfoType = {
  name: string;
  version: string;
  creator: string;
  status: string;
};
@Injectable()
export class AppService {
  info(): InfoType {
    return {
      name: 'nestjs-microservices-rabbitmq',
      version: '0.0.1',
      creator: 'Carlos Eduardo <duardbr@gmail.com>',
      status: 'online',
    };
  }
}
