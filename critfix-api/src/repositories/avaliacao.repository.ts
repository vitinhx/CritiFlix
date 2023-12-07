import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Avaliacao, AvaliacaoRelations} from '../models';

export class AvaliacaoRepository extends DefaultCrudRepository<
  Avaliacao,
  typeof Avaliacao.prototype.id,
  AvaliacaoRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(Avaliacao, dataSource);
  }
}
