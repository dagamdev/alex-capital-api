import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { SessionData } from 'src/types'

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SessionData | undefined => {
    const request = ctx.switchToHttp().getRequest<Express.Request>()
    const user = request.user

    return user as SessionData
  },
)
