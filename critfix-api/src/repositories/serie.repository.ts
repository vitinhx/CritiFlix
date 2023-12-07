import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Serie, SerieRelations, Temporada, Titulo} from '../models';
import {TemporadaRepository} from './temporada.repository';
import {TituloRepository} from './titulo.repository';

export class SerieRepository extends DefaultCrudRepository<
  Serie,
  typeof Serie.prototype.id,
  SerieRelations
> {

  public readonly temporada: HasOneRepositoryFactory<Temporada, typeof Serie.prototype.id>;

  public readonly titulo: BelongsToAccessor<Titulo, typeof Serie.prototype.id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('TemporadaRepository') protected temporadaRepositoryGetter: Getter<TemporadaRepository>, @repository.getter('TituloRepository') protected tituloRepositoryGetter: Getter<TituloRepository>,
  ) {
    super(Serie, dataSource);
    this.titulo = this.createBelongsToAccessorFor('titulo', tituloRepositoryGetter,);
    this.registerInclusionResolver('titulo', this.titulo.inclusionResolver);
    this.temporada = this.createHasOneRepositoryFactoryFor('temporada', temporadaRepositoryGetter);
    this.registerInclusionResolver('temporada', this.temporada.inclusionResolver);
  }
}
