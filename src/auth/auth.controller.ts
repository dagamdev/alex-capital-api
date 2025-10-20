import { Controller, Post, Body, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { TelegramUserDto } from './dto/telegram-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('telegram')
  async telegramLogin(
    @Body(new ValidationPipe()) telegramUserDto: TelegramUserDto,
  ) {
    return this.authService.validateTelegramUser(telegramUserDto)
  }
}
