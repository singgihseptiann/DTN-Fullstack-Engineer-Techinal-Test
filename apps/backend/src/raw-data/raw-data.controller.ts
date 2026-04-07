import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import type { Express } from 'express';
import { RawDataService } from './raw-data.service';
import { RawData } from './raw-data.schema';
import csvParser = require('csv-parser');
import { Readable } from 'stream';

@Controller('raw-data')
export class RawDataController {
  constructor(private readonly rawDataService: RawDataService) {}

  // ───── POST /raw-data/upload ─────
  @Post('upload')
  @UseInterceptors(FileInterceptor('files', { storage: memoryStorage() }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded');

    const results: RawData[] = [];
    let skippedRows = 0;

    await new Promise<void>((resolve, reject) => {
      Readable.from(file.buffer)
        .pipe(csvParser())
        .on('data', (row) => {
          const objectName: string = row['Object Name'] ?? '';
          const enodebIdMatch = objectName.match(/eNodeB ID=(\d+)/);
          const cellIdMatch = objectName.match(/Local Cell ID=(\d+)/);

          const resultTimeRaw = row['Result Time'];
          const availDurRaw = row['L.Cell.Avail.Dur'];

          const resultTime = new Date(resultTimeRaw);

          if (isNaN(resultTime.getTime()) || !enodebIdMatch || !cellIdMatch) {
            console.warn('Skipping invalid row:', row);
            skippedRows += 1;
            return;
          }

          results.push({
            resultTime,
            enodebId: enodebIdMatch[1],
            cellId: cellIdMatch[1],
            availDur: availDurRaw ? parseInt(availDurRaw, 10) : 0,
          });
        })
        .on('end', () => resolve())
        .on('error', (err) => reject(err));
    });

    try {
      const res = await this.rawDataService.createMany(results);
      return {
        total_parsed: results.length + skippedRows,
        inserted: res.upsertedCount || 0,
        skipped: skippedRows,
      };
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err.message);
    }
  }

  // ───── GET /raw-data/graph ─────
  @Get('graph')
  async getGraph(
    @Query('enodebId') enodebId: string,
    @Query('cellId') cellId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    if (!enodebId || !cellId || !startDate || !endDate) {
      throw new BadRequestException('Missing required query parameters');
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    const data = await this.rawDataService.findByEnodebCellAndDateRange(
      enodebId,
      cellId,
      start,
      end,
    );

    return data.map((row) => ({
      resultTime: row.resultTime,
      availability: ((row.availDur ?? 0) / 900) * 100,
    }));
  }
}
