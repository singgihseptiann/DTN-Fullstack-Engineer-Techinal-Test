import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RawData, RawDataDocument } from './raw-data.schema';
import { GetGraphDto } from './dto/get-graph.dto';

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

  async getGraphData(query: GetGraphDto) {
    const { enodebId, cellId, startDate, endDate } = query;

    const filter: any = {};

    if (enodebId) filter.enodebId = enodebId;
    if (cellId) filter.cellId = cellId;

    if (startDate || endDate) {
      filter.resultTime = {};
      if (startDate) filter.resultTime.$gte = startDate;
      if (endDate) filter.resultTime.$lte = endDate;
    }

    const data = await this.rawDataModel
      .find(filter)
      .sort({ resultTime: 1 })
      .limit(100) // ⚠️ penting banget
      .lean();

    return data.map((row) => ({
      resultTime: row.resultTime,
      availability: ((row.availDur ?? 0) / 900) * 100,
    }));
  }
}
