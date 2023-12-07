import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Direcao, DirecaoRelations} from '../models';

export class DirecaoRepository extends DefaultCrudRepository<
  Direcao,
  typeof Direcao.prototype.tituloId,
  DirecaoRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(Direcao, dataSource);
  }
}
