import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyThroughRepositoryFactory, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Avaliacao, Genero, Titulo, TituloGenero, TituloRelations} from '../models';
import {AvaliacaoRepository} from './avaliacao.repository';
import {GeneroRepository} from './genero.repository';
import {SerieRepository} from './serie.repository';
import {TituloGeneroRepository} from './titulo-genero.repository';

export class TituloRepository extends DefaultCrudRepository<
  Titulo,
  typeof Titulo.prototype.id,
  TituloRelations
> {

  public readonly generos: HasManyThroughRepositoryFactory<Genero, typeof Genero.prototype.id,
    TituloGenero,
    typeof Titulo.prototype.id
  >;

  public readonly avaliacao: HasOneRepositoryFactory<Avaliacao, typeof Titulo.prototype.id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('TituloGeneroRepository') protected tituloGeneroRepositoryGetter: Getter<TituloGeneroRepository>, @repository.getter('GeneroRepository') protected generoRepositoryGetter: Getter<GeneroRepository>, @repository.getter('AvaliacaoRepository') protected avaliacaoRepositoryGetter: Getter<AvaliacaoRepository>, @repository.getter('SerieRepository') protected serieRepositoryGetter: Getter<SerieRepository>,
  ) {
    super(Titulo, dataSource);
    this.avaliacao = this.createHasOneRepositoryFactoryFor('avaliacao', avaliacaoRepositoryGetter);
    this.registerInclusionResolver('avaliacao', this.avaliacao.inclusionResolver);
    this.generos = this.createHasManyThroughRepositoryFactoryFor('generos', generoRepositoryGetter, tituloGeneroRepositoryGetter,);
  }
}
