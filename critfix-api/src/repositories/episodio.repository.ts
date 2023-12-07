import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Episodio, EpisodioRelations} from '../models';

export class EpisodioRepository extends DefaultCrudRepository<
  Episodio,
  typeof Episodio.prototype.id,
  EpisodioRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(Episodio, dataSource);
  }
}
