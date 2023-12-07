import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TituloGenero, TituloGeneroRelations} from '../models';

export class TituloGeneroRepository extends DefaultCrudRepository<
  TituloGenero,
  typeof TituloGenero.prototype.generoId,
  TituloGeneroRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(TituloGenero, dataSource);
  }
}
