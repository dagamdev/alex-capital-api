import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Res,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { TelegramUserDto } from './dto/telegram-user.dto'
import type { Request, Response } from 'express'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('login')
  // async telegramLogin(
  //   @Body(new ValidationPipe()) telegramUserDto: TelegramUserDto,
  // ) {
  //   return this.authService.validateTelegramUser(telegramUserDto)
  // }

  @Post('login')
  async login(
    @Body(new ValidationPipe()) telegramUserDto: TelegramUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.validateTelegramUser(telegramUserDto)

    res.cookie('token', data.accessToken, {
      httpOnly: true,
      // secure: true, // solo HTTPS
      sameSite: 'strict',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24,
    })

    return { message: 'Login successful', ...data }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request) {
    return req.user
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token')
    return { message: 'Logout successful' }
  }
}
