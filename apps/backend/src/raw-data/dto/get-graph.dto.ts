import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class GetGraphDto {
  @IsString()
  @IsNotEmpty({ message: 'enodebId is required' })
  enodebId!: string;

  @IsString()
  @IsNotEmpty({ message: 'cellId is required' })
  cellId!: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: 'startDate is required' })
  startDate!: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: 'endDate is required' })
  endDate!: Date;
}
