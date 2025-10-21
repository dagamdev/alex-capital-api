import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { User } from './users.decorator'
import type { SessionData } from 'src/types'
import { UsersService } from './users.service'
import { UpdateUserDto } from './users.dto'

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@User() session: SessionData) {
    try {
      const user = await this.usersService.getUserById(session.sub)

      return user
    } catch (error: any) {
      console.error(error)
      throw error
    }
  }

  @Patch('me')
  async updateMe(
    @User() session: SessionData,
    @Body(new ValidationPipe()) data: UpdateUserDto,
  ) {
    try {
      const updatedUser = await this.usersService.updateUser(session.sub, data)

      return updatedUser
    } catch (error: any) {
      console.error(error)
      throw error
    }
  }
}
