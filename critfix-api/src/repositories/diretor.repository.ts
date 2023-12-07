import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Diretor, DiretorRelations, Titulo, Direcao} from '../models';
import {DirecaoRepository} from './direcao.repository';
import {TituloRepository} from './titulo.repository';

export class DiretorRepository extends DefaultCrudRepository<
  Diretor,
  typeof Diretor.prototype.id,
  DiretorRelations
> {

  public readonly titulos: HasManyThroughRepositoryFactory<Titulo, typeof Titulo.prototype.id,
          Direcao,
          typeof Diretor.prototype.id
        >;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('DirecaoRepository') protected direcaoRepositoryGetter: Getter<DirecaoRepository>, @repository.getter('TituloRepository') protected tituloRepositoryGetter: Getter<TituloRepository>,
  ) {
    super(Diretor, dataSource);
    this.titulos = this.createHasManyThroughRepositoryFactoryFor('titulos', tituloRepositoryGetter, direcaoRepositoryGetter,);
    this.registerInclusionResolver('titulos', this.titulos.inclusionResolver);
  }
}
