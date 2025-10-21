import { IsOptional, IsNumber } from 'class-validator'

export class UpdateUserDto {
  @IsNumber()
  @IsOptional()
  pocketOptionId: number | null
}
