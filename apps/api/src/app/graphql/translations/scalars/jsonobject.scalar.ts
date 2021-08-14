import { Scalar, CustomScalar } from '@nestjs/graphql';
import { JSONObject } from '../models/json.model';
import { Kind, ValueNode } from 'graphql';

@Scalar('JSONObject', type => JSONObject)
export class JSONObjectScalar
  implements CustomScalar<Record<string, unknown>, Record<string, unknown>>
{
  description = 'JSONObject custom scalar type';

  parseValue(value: Record<string, unknown>): Record<string, unknown> {
    return value;
  }

  serialize(value: Record<string, unknown>): Record<string, unknown> {
    return value;
  }

  parseLiteral(ast: ValueNode): Record<string, unknown> {
    return parse(ast);
  }
}

function parse(ast: ValueNode): Record<string, unknown> {
  if (ast.kind === Kind.LIST) {
    throw new Error('JSONObject scalar do not support lists');
  }
  if (ast.kind !== Kind.OBJECT) {
    return JSON.parse(ast['value']);
  }
  const result = {};
  for (const field of ast.fields) {
    result[field.name.value] = parse(field.value);
  }
  return result;
}
