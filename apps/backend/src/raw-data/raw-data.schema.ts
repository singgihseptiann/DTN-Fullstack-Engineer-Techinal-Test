import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RawDataDocument = RawData & Document;

@Schema({ collection: 'raw_data' })
export class RawData {
  @Prop({ required: true })
  resultTime!: Date;

  @Prop({ required: true })
  enodebId!: string;

  @Prop({ required: true })
  cellId!: string;

  @Prop()
  availDur?: number;
}

export const RawDataSchema = SchemaFactory.createForClass(RawData);

// Compound unique index — biar ga duplikat
RawDataSchema.index(
  { enodebId: 1, cellId: 1, resultTime: 1 },
  { unique: true }
);