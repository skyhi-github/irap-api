import { IsNotEmpty, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIRAPDto {

  @ApiProperty()
  @IsNotEmpty()
  mo!: string;

  @ApiProperty()
  @IsNotEmpty()
  cpo: string;

  @ApiProperty()
  @IsNotEmpty()
  article!: string;

  @ApiProperty()
  @IsNotEmpty()
  working_no!: string;

  @ApiProperty()
  @IsNotEmpty()
  country!: string;

  @ApiProperty()
  @IsNotEmpty()
  mo_order_qty!: number;

  @ApiProperty()
  @IsOptional()
  sample_size?: string;

  @ApiProperty()
  @IsOptional()
  tc_podd?: Date;

  @ApiProperty()
  @IsOptional()
  issue?: string;

  @ApiProperty()
  @IsOptional()
  root_cause?: string;

  @ApiProperty()
  @IsOptional()
  action?: string;

  @ApiProperty()
  @IsOptional()
  prevention?: string;

  @ApiProperty()
  @IsOptional()
  inspect_date?: Date;

  @ApiProperty()
  @IsOptional()
  inspect_result?: boolean;

  @ApiProperty()
  @IsOptional()
  inspect_from?: string;

  @ApiProperty()
  @IsOptional()
  inspector_name?: string;

  @ApiProperty()
  @IsOptional()
  person_in_charge?: string;

  @ApiProperty()
  @IsOptional()
  department?: string;

}

export class UpdateIRAPDto {

  @ApiProperty()
  @IsNotEmpty()
  mo!: string;

  @ApiProperty()
  @IsNotEmpty()
  cpo: string;

  @ApiProperty()
  @IsNotEmpty()
  article!: string;

  @ApiProperty()
  @IsNotEmpty()
  working_no!: string;

  @ApiProperty()
  @IsNotEmpty()
  country!: string;

  @ApiProperty()
  @IsNotEmpty()
  mo_order_qty!: number;

  @ApiProperty()
  @IsOptional()
  sample_size?: string;

  @ApiProperty()
  @IsOptional()
  tc_podd?: Date;

  @ApiProperty()
  @IsOptional()
  inspect_date?: Date;

  @ApiProperty()
  @IsOptional()
  inspect_result?: boolean;

  @ApiProperty()
  @IsOptional()
  issue?: string;

  @ApiProperty()
  @IsOptional()
  root_cause?: string;

  @ApiProperty()
  @IsOptional()
  action?: string;

  @ApiProperty()
  @IsOptional()
  prevention?: string;

  @ApiProperty()
  @IsOptional()
  inspect_from?: string;

  @ApiProperty()
  @IsOptional()
  inspector_name?: string;

  @ApiProperty()
  @IsOptional()
  person_in_charge?: string;

  @ApiProperty()
  @IsOptional()
  department?: string;

}

export class QueryIRAPDto {

  @ApiProperty({ required: false })
  @IsOptional()
  mo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  article?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  cpo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  working_no?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  mo_order_qty?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  tc_podd?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  country?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  inspect_date?: string;

}

export class IdsIRAPDto {

  @ApiProperty({ required: false })
  @IsOptional()
  bodies?: [];

}