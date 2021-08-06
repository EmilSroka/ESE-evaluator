import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Observable } from 'rxjs';
import { auth, driver, Record } from 'neo4j-driver';

@Injectable()
export class Neo4jProvider implements OnApplicationShutdown {
  private _driver = driver(
    process.env.DB_URL,
    auth.basic(process.env.DB_LOGIN, process.env.DB_PASSWORD)
  );
  private _session = this._driver.rxSession();

  query(query: string): Observable<Record> {
    return this._session.run(query).records();
  }

  onApplicationShutdown(): void {
    this._session.close();
    this._driver.close();
  }
}
