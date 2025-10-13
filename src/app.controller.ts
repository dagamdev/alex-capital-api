import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { objectToAuthDataMap, AuthDataValidator } from '@telegram-auth/server';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ping')
  ping() {
    return {
      message: 'pong',
    };
  }

  @Post('auth/telegram')
  async authTelegram(@Body() req: any) {
    console.log(req);
    const botToken = process.env.BOT_TOKEN ?? '';
    const validator = new AuthDataValidator({ botToken });
    const data = objectToAuthDataMap(req);
    const user = await validator.validate(data);

    return user;
  }
}
