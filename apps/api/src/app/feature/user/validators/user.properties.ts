import {
  baseSanitizer,
  isEmailValid,
  isPasswordValid,
  isUsernameValid,
  sanitizeEmail,
} from '@ese/validators';

type Property = {
  required: boolean;
  type: string;
  validator?: (prop: any) => boolean;
  sanitizer?: (prop: any) => any;
};

export const REGISTRATION_PROPERTIES = [
  'email',
  'username',
  'password',
  'organization',
  'about',
];

export const UPDATE_PROPERTIES = [
  'username',
  'password',
  'organization',
  'about',
];

export const DB_MODEL_PROPERTIES = [
  'id',
  'email',
  'username',
  'passwordHash',
  'organization',
  'about',
];

export const USER_PROPERTIES: Record<string, Property> = {
  id: {
    required: true,
    type: 'string',
  },
  email: {
    required: true,
    type: 'string',
    validator: isEmailValid,
    sanitizer: sanitizeEmail,
  },
  username: {
    required: true,
    type: 'string',
    validator: isUsernameValid,
  },
  passwordHash: {
    required: true,
    type: 'string',
  },
  password: {
    required: true,
    type: 'string',
    validator: isPasswordValid,
  },
  organization: {
    required: false,
    type: 'string',
    sanitizer: baseSanitizer,
  },
  about: {
    required: false,
    type: 'string',
    sanitizer: baseSanitizer,
  },
};
