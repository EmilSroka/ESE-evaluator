import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AddConfigModel, ConfigInfoDbModel } from '@ese/api-interfaces';
import { CreateConfigService } from './services/create.service';
import { AccessConfigurationService } from './services/list.service';
import { Configuration } from '../../graphql/configuration/models/configuration.model';

@Injectable()
export class ConfigurationService {
  constructor(
    private createService: CreateConfigService,
    private listService: AccessConfigurationService,
  ) {}

  create(data: AddConfigModel): Observable<ConfigInfoDbModel> {
    return this.createService.create(data);
  }

  list(): Observable<Configuration[]> {
    return this.listService.list();
  }
}
