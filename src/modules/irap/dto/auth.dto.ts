import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'example@bowker.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '3209' })
  @IsEmail()
  @IsNotEmpty()
  employee_id: string;

  @ApiProperty({ example: '%Y0&`~(*#HE.?2' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
