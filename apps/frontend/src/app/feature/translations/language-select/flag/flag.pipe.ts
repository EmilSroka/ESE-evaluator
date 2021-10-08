import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flag',
})
export class FlagPipe implements PipeTransform {
  transform(tag: string): string {
    return Array.from(countryCodeToCountry(tag))
      .map(letterToLetterEmoji)
      .join('');
  }
}

function letterToLetterEmoji(letter: string): string {
  return String.fromCodePoint(letter.toLowerCase().charCodeAt(0) + 127365);
}

function countryCodeToCountry(tag: string): string {
  const lastPart = tag.split('-').pop() ?? '';
  return lastPart.toUpperCase();
}
