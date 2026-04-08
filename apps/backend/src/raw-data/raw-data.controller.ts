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
import { GetGraphDto } from './dto/get-graph.dto';
import { GraphResponseDto } from './dto/graph-response.dto';
import { plainToInstance } from 'class-transformer';
import { SkipResponse } from 'src/common/decorators/skip-response.decorators';
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

      const inserted = res.upsertedCount || 0;
      const matched = res.matchedCount || 0;

      let message = '';

      if (inserted > 0 && matched === 0) {
        message = `Successfully inserted ${inserted} new records`;
      } else if (inserted === 0 && matched > 0) {
        message = `All data already exists (${matched} duplicates skipped)`;
      } else {
        message = `Processed ${inserted} new and ${matched} existing records`;
      }

      return {
        message,
        data: {
          total_parsed: results.length + skippedRows,
          inserted,
          matched,
          skipped: skippedRows,
        },
      };
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err.message);
    }
  }

  // ───── GET /raw-data/graph ─────
  @Get('graph')
  @SkipResponse()
  async getGraph(@Query() query: GetGraphDto) {
    const data = await this.rawDataService.getGraphData(query);

    return plainToInstance(GraphResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
