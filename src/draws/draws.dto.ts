import { Group } from '@prisma/client'
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString } from 'class-validator'

class DrawOptionalBase {
  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  endAt?: string

  @IsInt()
  @IsOptional()
  maxParticipants?: number

  @IsEnum(Group)
  @IsOptional()
  requiresGroup?: keyof typeof Group

  @IsBoolean()
  @IsOptional()
  requiresPocket?: boolean
}

export class CreateDrawDto extends DrawOptionalBase {
  @IsString()
  title: string
}

export class UpdateDrawDto extends DrawOptionalBase {
  @IsString()
  @IsOptional()
  title?: string
}
