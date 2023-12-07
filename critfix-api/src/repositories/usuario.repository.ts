import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Avaliacao} from '../models';
import {AvaliacaoRepository} from './avaliacao.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly avaliacao: HasOneRepositoryFactory<Avaliacao, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('AvaliacaoRepository') protected avaliacaoRepositoryGetter: Getter<AvaliacaoRepository>,
  ) {
    super(Usuario, dataSource);
    this.avaliacao = this.createHasOneRepositoryFactoryFor('avaliacao', avaliacaoRepositoryGetter);
  }
}
