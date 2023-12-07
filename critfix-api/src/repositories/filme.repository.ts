import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Filme, FilmeRelations, Titulo} from '../models';
import {TituloRepository} from './titulo.repository';

export class FilmeRepository extends DefaultCrudRepository<
  Filme,
  typeof Filme.prototype.id,
  FilmeRelations
> {

  public readonly titulo: BelongsToAccessor<Titulo, typeof Filme.prototype.id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('TituloRepository') protected tituloRepositoryGetter: Getter<TituloRepository>,
  ) {
    super(Filme, dataSource);
    this.titulo = this.createBelongsToAccessorFor('titulo', tituloRepositoryGetter,);
    this.registerInclusionResolver('titulo', this.titulo.inclusionResolver);
  }
}
