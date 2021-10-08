import validator from 'validator';
import { baseSanitizer } from './base.sanitizer';

export function sanitizeEmail(email: string): string {
  const base = baseSanitizer(email);
  const normalized = validator.normalizeEmail(base);
  return normalized ? normalized : email;
}
