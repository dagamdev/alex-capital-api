import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import type { Draw, Status } from '@prisma/client'
import { CreateDrawDto, UpdateDrawDto } from './draws.dto'

function formatDrawData(
  draw: Draw & {
    _count: {
      participants: number
    }
  },
) {
  return {
    ...draw,
    currentParticipants: draw._count.participants,
  }
}

@Injectable()
export class DrawsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDraws(status?: keyof typeof Status) {
    const draws = await this.prisma.draw.findMany({
      where: {
        status,
      },
      include: {
        _count: {
          select: { participants: true },
        },
      },
    })

    return draws.map(formatDrawData)
  }

  async getDrawById(id: string) {
    const draw = await this.prisma.draw.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: { participants: true },
        },
      },
    })

    if (draw) return formatDrawData(draw)

    return draw
  }

  async createDraw(data: CreateDrawDto) {
    const newDraw = await this.prisma.draw.create({
      data,
      include: {
        _count: {
          select: { participants: true },
        },
      },
    })

    return formatDrawData(newDraw)
  }

  async updateDraw(id: string, data: UpdateDrawDto) {
    const updatedDraw = await this.prisma.draw.update({
      where: {
        id,
      },
      data,
      include: {
        _count: {
          select: { participants: true },
        },
        participants: true,
      },
    })

    return formatDrawData(updatedDraw)
  }

  async deleteDraw(id: string) {
    return await this.prisma.draw.delete({
      where: {
        id,
      },
    })
  }
}
