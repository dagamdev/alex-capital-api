import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramUserDto } from './dto/telegram-user.dto';
import * as crypto from 'crypto';
import { BOT_TOKEN } from 'src/utils/constants';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async validateTelegramUser(telegramUserDto: TelegramUserDto) {
    console.log('validateTelegramUser');
    const secret = crypto.createHash('sha256').update(BOT_TOKEN).digest();

    const { hash, ...userData } = telegramUserDto;

    const dataCheckString = Object.keys(userData)
      .sort()
      .map((key) => `${key}=${userData[key]}`)
      .join('\n');

    const hmac = crypto
      .createHmac('sha256', secret)
      .update(dataCheckString)
      .digest('hex');

    if (hmac !== hash) {
      throw new UnauthorizedException('Invalid Telegram user');
    }

    const user = await this.prisma.user.upsert({
      where: { telegramId: telegramUserDto.id },
      update: {
        firstName: telegramUserDto.first_name,
        lastName: telegramUserDto.last_name,
        username: telegramUserDto.username,
        photoUrl: telegramUserDto.photo_url,
      },
      create: {
        telegramId: telegramUserDto.id,
        firstName: telegramUserDto.first_name,
        lastName: telegramUserDto.last_name,
        username: telegramUserDto.username,
        photoUrl: telegramUserDto.photo_url,
      },
    });

    return user;
  }
}
