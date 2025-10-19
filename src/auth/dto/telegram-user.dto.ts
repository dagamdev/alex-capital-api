import { IsString, IsOptional, IsUrl, IsInt } from 'class-validator';

export class TelegramUserDto {
  @IsInt()
  id: number;

  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsUrl()
  photo_url?: string;

  @IsString()
  auth_date: string;

  @IsString()
  hash: string;
}
