import { Injectable } from '@nestjs/common';
import { DatasetMetadataModel, DatasetModel } from '@ese/api-interfaces';

@Injectable()
export class MetadataDatasetService {
  get(file: Buffer): DatasetMetadataModel {
    const asObject: DatasetModel = JSON.parse(file.toString());
    const result = {
      seeds: undefined,
      categories: 0,
    };
    for (const key in asObject) {
      result.seeds = Math.min(
        result.seeds ?? Infinity,
        asObject[key].items.length,
      );
      result.categories += 1;
    }
    return result;
  }
}
