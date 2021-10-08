import validator from 'validator';

export function baseSanitizer(input: string): string {
  return validator.escape(validator.trim(input));
}
