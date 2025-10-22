import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import type { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import type { SessionData } from 'src/types'
import { JWT_SECRET } from 'src/utils/constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return req?.cookies?.token
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    })
  }

  validate(payload: SessionData) {
    return payload
  }
}
