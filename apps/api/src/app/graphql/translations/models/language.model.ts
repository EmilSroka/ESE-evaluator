import { LanguageModel } from '@ese/api-interfaces';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Language implements LanguageModel {
  @Field() englishName: string;

  @Field() ownName: string;

  @Field() tag: string;
}
