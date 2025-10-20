import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
})
export class UsersModule {}
