export const ID_SERVICE = 'ID SERVICE';

export interface IdService {
  generate(): string;
  isId(id: string): boolean;
}
