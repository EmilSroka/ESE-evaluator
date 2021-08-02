import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('translations/:lang')
  translationTest(@Param('lang') lang) {
    console.log(lang);
    return {
      h1: 'Elo'
    }
  }
}
