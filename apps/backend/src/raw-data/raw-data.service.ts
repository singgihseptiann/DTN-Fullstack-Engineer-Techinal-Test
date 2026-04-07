import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RawData, RawDataDocument } from './raw-data.schema';

@Injectable()
export class RawDataService {
  constructor(
    @InjectModel(RawData.name) private rawDataModel: Model<RawDataDocument>,
  ) {}

  async createMany(data: RawData[]) {
    const ops = data.map((item) => ({
      updateOne: {
        filter: {
          enodebId: item.enodebId,
          cellId: item.cellId,
          resultTime: item.resultTime,
        },
        update: { $setOnInsert: item },
        upsert: true,
      },
    }));

    return this.rawDataModel.bulkWrite(ops);
  }

  // ───── Method untuk GET /raw-data/graph ─────
  async findByEnodebCellAndDateRange(
    enodebId: string,
    cellId: string,
    startDate: Date,
    endDate: Date,
  ) {
    return this.rawDataModel
      .find({
        enodebId,
        cellId,
        resultTime: { $gte: startDate, $lte: endDate },
      })
      .sort({ resultTime: 1 })
      .lean();
  }
}
