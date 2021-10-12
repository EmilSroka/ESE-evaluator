import { Injectable } from '@nestjs/common';
import { CategoryModel, DatasetModel } from '@ese/api-interfaces';

@Injectable()
export class DatasetValidator {
  isValid(input: any): input is DatasetModel {
    if (!isObject(input)) return false;
    if (isEmptyObject(input)) return false;
    for (const value of Object.values(input)) {
      if (!isCategory(value)) return false;
    }

    return true;
  }
}

function isEmptyObject(input: Record<string, any>): boolean {
  return [...Object.keys(input)].length === 0;
}

function isObject(input: any): boolean {
  return typeof input === 'object' && input != null;
}

const CATEGORY_KEYS = ['name', 'description', 'items'];
function isCategory(input: any): input is CategoryModel {
  if (!isObject(input)) return false;
  for (const key of Object.keys(input)) {
    if (!CATEGORY_KEYS.includes(key)) return false;
  }
  if (input.name == null) return false;
  if (typeof input.name !== 'string') return false;
  if (!Array.isArray(input.items)) return false;
  for (const item in input.items) {
    if (typeof item !== 'string') return false;
  }
  if (input.description != null && typeof input.description !== 'string')
    return false;
  return true;
}
