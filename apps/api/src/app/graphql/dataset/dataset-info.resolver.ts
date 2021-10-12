import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../feature/auth/guards/jwt-auth.guard';
import { Observable } from 'rxjs';
import { DatasetInfo } from './models/dataset-info.model';
import { DatasetService } from '../../feature/dataset/dataset.service';

@Resolver(of => DatasetInfo)
export class DatasetInfoResolver {
  constructor(private datasets: DatasetService) {}

  @Query(() => [DatasetInfo])
  @UseGuards(JwtAuthGuard)
  listDataSets(): Observable<DatasetInfo[]> {
    return this.datasets.list();
  }
}
