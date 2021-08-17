import { gql } from '@apollo/client/core';
import { LanguageModel } from '@ese/api-interfaces';

export const GET_TRANSLATIONS = gql`
  query GetTranslations($tag: String!) {
    translationsFor(tag: $tag)
  }
`;

export const GET_DEFAULT_LANGUAGE = gql`
  query GetDefaultLanguage {
    defaultLanguage {
      tag
    }
  }
`;
export type GetDefaultLanguageResult = {
  defaultLanguage: Pick<LanguageModel, 'tag'>;
};

export const GET_AVAILABLE_LANGUAGES = gql`
  query GetAvailableLanguages {
    availableLanguages {
      tag
      ownName
      englishName
    }
  }
`;
export type GetAvailableLanguages = { availableLanguages: LanguageModel[] };
