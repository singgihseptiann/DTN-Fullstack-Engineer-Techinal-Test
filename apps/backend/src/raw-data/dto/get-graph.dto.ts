import { IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class GetGraphDto {
  @IsOptional()
  @IsString()
  enodebId?: string;

  @IsOptional()
  @IsString()
  cellId?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;
}
