import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Atuacao, AtuacaoRelations} from '../models';

export class AtuacaoRepository extends DefaultCrudRepository<
  Atuacao,
  typeof Atuacao.prototype.tituloId,
  AtuacaoRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(Atuacao, dataSource);
  }
}
