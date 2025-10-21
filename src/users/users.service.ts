import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateUserDto } from './users.dto'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserById(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
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
  }

  async updateUser(userId: string, data: UpdateUserDto) {
    const updatedUser = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data,
    })

    const { telegramId, ...user } = updatedUser

    return { ...user, telegramId: +telegramId.toString() }
  }
}
