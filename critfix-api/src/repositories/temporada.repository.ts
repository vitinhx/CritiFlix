import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Temporada, TemporadaRelations, Episodio} from '../models';
import {EpisodioRepository} from './episodio.repository';

export class TemporadaRepository extends DefaultCrudRepository<
  Temporada,
  typeof Temporada.prototype.id,
  TemporadaRelations
> {

  public readonly episodio: HasOneRepositoryFactory<Episodio, typeof Temporada.prototype.id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('EpisodioRepository') protected episodioRepositoryGetter: Getter<EpisodioRepository>,
  ) {
    super(Temporada, dataSource);
    this.episodio = this.createHasOneRepositoryFactoryFor('episodio', episodioRepositoryGetter);
  }
}
