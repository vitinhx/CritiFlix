import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Genero, GeneroRelations} from '../models';

export class GeneroRepository extends DefaultCrudRepository<
  Genero,
  typeof Genero.prototype.id,
  GeneroRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(Genero, dataSource);
  }
}
