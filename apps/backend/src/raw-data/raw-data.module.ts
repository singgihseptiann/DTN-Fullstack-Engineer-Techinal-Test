import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RawData, RawDataSchema } from './raw-data.schema';
import { RawDataService } from './raw-data.service';
import { RawDataController } from './raw-data.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RawData.name, schema: RawDataSchema }]),
  ],
  providers: [RawDataService],
  controllers: [RawDataController],
})
export class RawDataModule {}