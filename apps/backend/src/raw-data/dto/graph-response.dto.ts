import { Expose } from 'class-transformer';

export class GraphResponseDto {
  @Expose()
  resultTime!: Date;

  @Expose()
  availability!: number;
}
