import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigGateway } from '../gateways/config.gateway';
import { reduce } from 'rxjs/operators';
import { Configuration } from '../../../graphql/configuration/models/configuration.model';

@Injectable()
export class AccessConfigurationService {
  constructor(private gateway: ConfigGateway) {}

  list(): Observable<Configuration[]> {
    return this.gateway.getAll().pipe(
      reduce((acc, val) => {
        acc.push(val);
        return acc;
      }, []),
    );
  }
}
