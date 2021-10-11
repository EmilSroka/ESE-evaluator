import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DatasetInfoWithOwnerModel } from '@ese/api-interfaces';
import { DatasetGateway } from '../gateways/dataset.gateway';

@Injectable()
export class DatasetInfoCache implements OnApplicationBootstrap {
  private entriesOrderedByCreateTime: DatasetInfoWithOwnerModel[] = [];
  private nameToEntry = new Map<string, DatasetInfoWithOwnerModel>();

  constructor(private gateway: DatasetGateway) {}

  onApplicationBootstrap(): void {
    this.gateway.getAll().subscribe({
      next: datasetInfo => this.add(datasetInfo),
      complete: () => this.entriesOrderedByCreateTime.sort(compareByName),
    });
  }

  getByName(name: string): DatasetInfoWithOwnerModel | null {
    return this.nameToEntry.has(name) ? this.nameToEntry.get(name) : null;
  }

  has(name: string): boolean {
    return this.nameToEntry.has(name);
  }

  add(entry: DatasetInfoWithOwnerModel): void {
    this.nameToEntry.set(entry.name, entry);
    this.entriesOrderedByCreateTime.push(entry);
  }
}

function compareByName(
  info1: DatasetInfoWithOwnerModel,
  info2: DatasetInfoWithOwnerModel,
): number {
  return info1.createdAt - info2.createdAt;
}
