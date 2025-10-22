import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'
import { ORIGINS } from './utils/constants'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: ORIGINS,
    credentials: true,
  })
  app.use(cookieParser())
  await app.listen(process.env.PORT ?? 3214)
}
void bootstrap()
