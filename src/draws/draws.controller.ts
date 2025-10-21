import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { DrawsService } from './draws.service'
import { CreateDrawDto, UpdateDrawDto } from './draws.dto'

@UseGuards(JwtAuthGuard)
@Controller('draws')
export class DrawsController {
  constructor(private readonly drawsService: DrawsService) {}

  @Get()
  async getDraws() {
    try {
      return await this.drawsService.getDraws()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  @Get(':id')
  async getDrawById(@Param('id') id: string) {
    try {
      const draw = await this.drawsService.getDrawById(id)

      if (!draw) {
        throw new NotFoundException(`Draw with id ${id} not found`)
      }

      return draw
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  @Post()
  async createDraw(@Body(new ValidationPipe()) data: CreateDrawDto) {
    try {
      return await this.drawsService.createDraw(data)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  @Patch(':id')
  async updateDraw(
    @Param('id') id: string,
    @Body(new ValidationPipe()) data: UpdateDrawDto,
  ) {
    try {
      return await this.drawsService.updateDraw(id, data)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  @Delete(':id')
  async deleteDraw(@Param('id') id: string) {
    try {
      return await this.drawsService.deleteDraw(id)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
