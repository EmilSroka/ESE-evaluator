import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {
  DatasetInfoDbWithOwnerModel,
  DatasetInfoModel,
} from '@ese/api-interfaces';
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

  update(oldName: string, info: DatasetInfoModel): void {
    const target = this.getByName(oldName);
    if (target == null) return;
    target.name = info.name;
    target.description = info.description;
    this.nameToEntry.set(info.name, target);
    this.nameToEntry.delete(oldName);
  }

  has(name: string): boolean {
    return this.nameToEntry.has(name);
  }

  add(entry: DatasetInfoDbWithOwnerModel): void {
    this.nameToEntry.set(entry.name, entry);
    this.entriesOrderedByCreateTime.push(entry);
  }

  getByName(name: string): DatasetInfoDbWithOwnerModel | null {
    return this.nameToEntry.has(name) ? this.nameToEntry.get(name) : null;
  }
}

function compareByName(
  info1: DatasetInfoDbWithOwnerModel,
  info2: DatasetInfoDbWithOwnerModel,
): number {
  return info1.createdAt - info2.createdAt;
}
