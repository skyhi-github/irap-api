import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ example: '00937' })
  @IsEmail()
  @IsNotEmpty()
  employee_id: string;

  @ApiProperty({ example: 'Finance' })
  @IsString()
  @IsNotEmpty()
  department_name?: string;

  @ApiProperty({ example: 'Finance' })
  @IsString()
  @IsNotEmpty()
  position_name?: string;

  @ApiProperty({ example: '00937' })
  @IsString()
  @IsNotEmpty()
  manager_id?: string;
}