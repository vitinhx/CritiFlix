import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Artista, ArtistaRelations, Titulo, Atuacao} from '../models';
import {AtuacaoRepository} from './atuacao.repository';
import {TituloRepository} from './titulo.repository';

export class ArtistaRepository extends DefaultCrudRepository<
  Artista,
  typeof Artista.prototype.id,
  ArtistaRelations
> {

  public readonly titulos: HasManyThroughRepositoryFactory<Titulo, typeof Titulo.prototype.id,
          Atuacao,
          typeof Artista.prototype.id
        >;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('AtuacaoRepository') protected atuacaoRepositoryGetter: Getter<AtuacaoRepository>, @repository.getter('TituloRepository') protected tituloRepositoryGetter: Getter<TituloRepository>,
  ) {
    super(Artista, dataSource);
    this.titulos = this.createHasManyThroughRepositoryFactoryFor('titulos', tituloRepositoryGetter, atuacaoRepositoryGetter,);
    this.registerInclusionResolver('titulos', this.titulos.inclusionResolver);
  }
}
