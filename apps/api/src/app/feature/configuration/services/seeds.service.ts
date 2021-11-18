import { Injectable } from '@nestjs/common';
import {
  BenchmarkData,
  CategoryModel,
  DatasetModel,
} from '@ese/api-interfaces';

@Injectable()
export class SeedsService {
  getBenchmarkData(
    data: DatasetModel,
    categories: number,
    seeds: number,
  ): BenchmarkData {
    const categoriesKeys = this.getCategories(data, categories);
    const result = {};
    for (const key of categoriesKeys) {
      result[key] = this.getSeeds(data, key, seeds);
    }
    return result;
  }

  private getCategories(data: DatasetModel, categories: number): string[] {
    const allCategories = [...Object.keys(data)];
    return randomize(allCategories).slice(0, categories);
  }

  private getSeeds(
    data: DatasetModel,
    categoryKey: string,
    seeds: number,
  ): string[] {
    const entries = (data[categoryKey] as CategoryModel).items;
    return randomize(entries).slice(0, seeds);
  }
}

function randomize<T>(array: T[]): T[] {
  const copy = [...array];

  for (let i = 0; i < array.length; i++) {
    const rand = randomInRange(i, array.length - 1);
    [copy[i], copy[rand]] = [copy[rand], copy[i]];
  }

  return copy;
}

function randomInRange(from: number, to: number): number {
  const size = to - from + 1;
  const random = Math.random();
  return Math.floor(from + random * size);
}
