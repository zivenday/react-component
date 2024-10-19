import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('data')
  data() {
    return [
      {
        name: 'John',
        age: 20,
        email: 'john@gmail.com',
        key: 'john',
      },
      {
        name: 'Jane',
        age: 21,
        email: 'jane@gmail.com',
        key: 'jane',
      },
    ];
  }
}
