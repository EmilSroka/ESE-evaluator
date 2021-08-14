import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Observable } from 'rxjs';
import { auth, driver, Record } from 'neo4j-driver';
import { finalize } from 'rxjs/operators';

@Injectable()
export class Neo4jProvider implements OnApplicationShutdown {
  private driver = driver(
    process.env.DB_URL,
    auth.basic(process.env.DB_LOGIN, process.env.DB_PASSWORD),
  );

  query(query: string): Observable<Record> {
    const session = this.driver.rxSession();
    return session
      .run(query)
      .records()
      .pipe(finalize(() => session.close()));
  }

  onApplicationShutdown(): void {
    this.driver.close();
  }
}
