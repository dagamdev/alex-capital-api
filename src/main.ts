import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: [
      'https://lan-unmenacing-diddly.ngrok-free.dev',
      'https://alex-capital-web.vercel.app',
    ],
    credentials: true,
  })
  app.use(cookieParser())
  await app.listen(process.env.PORT ?? 3214)
}
void bootstrap()
