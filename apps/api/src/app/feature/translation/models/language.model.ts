import { Language } from '@ese/api-interfaces';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LanguageObject implements Language {
  @Field() englishName: string;

  @Field() ownName: string;

  @Field() tag: string;
}
