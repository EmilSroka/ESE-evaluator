import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AddConfigModel, ConfigInfoDbModel } from '@ese/api-interfaces';
import { CreateConfigService } from './services/create.service';

@Injectable()
export class ConfigurationService {
  constructor(private createService: CreateConfigService) {}

  create(data: AddConfigModel): Observable<ConfigInfoDbModel> {
    return this.createService.create(data);
  }
}
