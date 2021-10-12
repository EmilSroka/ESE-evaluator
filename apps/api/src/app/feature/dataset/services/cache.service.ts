import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DatasetInfoDbWithOwnerModel } from '@ese/api-interfaces';
import { DatasetGateway } from '../gateways/dataset.gateway';

@Injectable()
export class DatasetInfoCache implements OnApplicationBootstrap {
  private entriesOrderedByCreateTime: DatasetInfoDbWithOwnerModel[] = [];
  private nameToEntry = new Map<string, DatasetInfoDbWithOwnerModel>();

  constructor(private gateway: DatasetGateway) {}

  onApplicationBootstrap(): void {
    this.gateway.getAll().subscribe({
      next: datasetInfo => this.add(datasetInfo),
      complete: () => this.entriesOrderedByCreateTime.sort(compareByName),
    });
  }

  getAll(): DatasetInfoDbWithOwnerModel[] {
    return [...this.entriesOrderedByCreateTime];
  }

  getByName(name: string): DatasetInfoDbWithOwnerModel | null {
    return this.nameToEntry.has(name) ? this.nameToEntry.get(name) : null;
  }

  has(name: string): boolean {
    return this.nameToEntry.has(name);
  }

  add(entry: DatasetInfoDbWithOwnerModel): void {
    this.nameToEntry.set(entry.name, entry);
    this.entriesOrderedByCreateTime.push(entry);
  }
}

function compareByName(
  info1: DatasetInfoDbWithOwnerModel,
  info2: DatasetInfoDbWithOwnerModel,
): number {
  return info1.createdAt - info2.createdAt;
}
