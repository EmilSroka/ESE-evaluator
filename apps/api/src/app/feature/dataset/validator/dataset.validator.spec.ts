import { Test, TestingModule } from '@nestjs/testing';
import { DatasetValidator } from './dataset.validator';
import { CategoryModel } from '@ese/api-interfaces';

describe('DatasetValidator', () => {
  let validator: DatasetValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatasetValidator],
    }).compile();

    validator = module.get<DatasetValidator>(DatasetValidator);
  });

  it('checks if provided object is a valid data set', () => {
    expect(validator.isValid('')).toBeFalsy();
    expect(validator.isValid(1)).toBeFalsy();
    expect(validator.isValid(true)).toBeFalsy();

    expect(validator.isValid({})).toBeFalsy();
    expect(
      validator.isValid({ cities: categories[0], universities: categories[1] }),
    ).toBeTruthy();
    expect(
      validator.isValid({ item: { wrong: incorrectCategory } }),
    ).toBeFalsy();
  });
});

const incorrectCategory = {
  name: 'kkk',
  items: [1, 2, '3'],
};

const categories: CategoryModel[] = [
  {
    name: 'cities',
    description: 'desc',
    items: ['Warsaw', 'Krakow', 'New York'],
  },
  {
    name: 'universities',
    description: 'desc 2',
    items: ['MIT', 'AGH'],
  },
];
