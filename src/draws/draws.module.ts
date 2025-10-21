import { Module } from '@nestjs/common'
import { DrawsService } from './draws.service'
import { DrawsController } from './draws.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [DrawsService],
  controllers: [DrawsController],
})
export class DrawsModule {}
