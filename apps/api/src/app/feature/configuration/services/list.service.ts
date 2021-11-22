import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigGateway } from '../gateways/config.gateway';
import { map, reduce } from 'rxjs/operators';
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

  // note(es): function can be optimize by creating query with condition
  getByName(name: string): Observable<Configuration | null> {
    return this.list().pipe(
      map(configs => {
        let result: Configuration | null = null;
        for (const config of configs) {
          if (config.name === name) {
            result = config;
          }
        }
        return result;
      }),
    );
  }
}
