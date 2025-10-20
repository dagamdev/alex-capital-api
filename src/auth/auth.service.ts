import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { TelegramUserDto } from './dto/telegram-user.dto'
import * as crypto from 'crypto'
import { BOT_TOKEN } from 'src/utils/constants'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateTelegramUser(telegramUser: TelegramUserDto) {
    const secret = crypto.createHash('sha256').update(BOT_TOKEN).digest()

    const { hash, ...userData } = telegramUser

    const dataCheckString = Object.keys(userData)
      .sort()
      .map((key) => `${key}=${userData[key]}`)
      .join('\n')

    const hmac = crypto
      .createHmac('sha256', secret)
      .update(dataCheckString)
      .digest('hex')

    if (hmac !== hash) {
      throw new UnauthorizedException('Invalid Telegram user')
    }

    const user = await this.prisma.user.upsert({
      where: { telegramId: BigInt(telegramUser.id) },
      update: {
        firstName: telegramUser.first_name,
        lastName: telegramUser.last_name,
        username: telegramUser.username,
        photoUrl: telegramUser.photo_url,
      },
      create: {
        telegramId: BigInt(telegramUser.id),
        firstName: telegramUser.first_name,
        lastName: telegramUser.last_name,
        username: telegramUser.username,
        photoUrl: telegramUser.photo_url,
      },
    })

    return {
      access_token: this.jwtService.sign({ sub: user.id }),
    }
  }
}
