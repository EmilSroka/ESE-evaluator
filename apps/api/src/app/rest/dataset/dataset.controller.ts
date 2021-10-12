import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateDatasetDto } from './models/dataset-info.model';
import { DatasetService } from '../../feature/dataset/dataset.service';
import { CurrentUserRest } from '../../feature/auth/decorators/current-user.decorator';
import { Observable } from 'rxjs';
import {
  DatasetInfoDbWithOwnerModel,
  DatasetInfoWithOwnerModel,
  UserDbModel,
} from '@ese/api-interfaces';
import { map, switchMap } from 'rxjs/operators';
import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import { JwtAuthRestGuard } from '../../feature/auth/guards/jwt-auth.guard';
import { RestExceptionFilter } from '../../feature/errors/rest-exception.filter';

type File = Express.Multer.File;

@Controller('dataset')
export class DatasetController {
  constructor(private dataset: DatasetService) {}

  @Post('create')
  @UseGuards(JwtAuthRestGuard)
  @UseFilters(RestExceptionFilter)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @CurrentUserRest() user: Observable<UserDbModel>,
    @UploadedFile() file: File,
    @Body(new ValidationPipe({ whitelist: true })) data: CreateDatasetDto,
  ): Observable<DatasetInfoWithOwnerModel> {
    return user.pipe(
      switchMap(user => this.dataset.create(data, file.buffer, user)),
      map(info => toDatasetInfoWithOwner(info)),
    );
  }
}

function toDatasetInfoWithOwner(
  datasetInfo: DatasetInfoDbWithOwnerModel,
): DatasetInfoWithOwnerModel {
  const copy = { ...datasetInfo };
  delete copy.id;
  delete copy.createdAt;
  return copy;
}
