import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { User } from './users.decorator'
import { PrismaService } from 'src/prisma/prisma.service'
import type { SessionData } from 'src/types'

@Controller('user')
export class UsersController {
  constructor(private readonly prismaService: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@User() session: SessionData) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: session.sub,
        },
        omit: {
          createdAt: true,
          updatedAt: true,
        },
      })

      if (!user) {
        throw new Error('User not found')
      }

      const { telegramId, ...data } = user

      return { ...data, telegramId: +telegramId.toString() }
    } catch (error: any) {
      console.error(error)
      throw error
    }
  }
}
