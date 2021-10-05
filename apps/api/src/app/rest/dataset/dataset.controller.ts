import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateDatasetDto } from './models/dataset-info.model';
import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';

type File = Express.Multer.File;

@Controller('dataset')
export class DatasetController {
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: File, @Body() data: CreateDatasetDto) {
    console.log(file.buffer);
    console.log(data);
  }
}
