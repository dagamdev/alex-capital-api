import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import type { Status } from '@prisma/client'
import { CreateDrawDto, UpdateDrawDto } from './draws.dto'

@Injectable()
export class DrawsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDraws(status?: keyof typeof Status) {
    return await this.prisma.draw.findMany({
      where: {
        status,
      },
    })
  }

  async getDrawById(id: string) {
    return await this.prisma.draw.findUnique({
      where: {
        id,
      },
    })
  }

  async createDraw(data: CreateDrawDto) {
    return await this.prisma.draw.create({
      data,
    })
  }

  async updateDraw(id: string, data: UpdateDrawDto) {
    return await this.prisma.draw.update({
      where: {
        id,
      },
      data,
    })
  }

  async deleteDraw(id: string) {
    return await this.prisma.draw.delete({
      where: {
        id,
      },
    })
  }
}
