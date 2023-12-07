import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Pessoa, PessoaRelations, Diretor, Artista, Usuario} from '../models';
import {DiretorRepository} from './diretor.repository';
import {ArtistaRepository} from './artista.repository';
import {UsuarioRepository} from './usuario.repository';

export class PessoaRepository extends DefaultCrudRepository<
  Pessoa,
  typeof Pessoa.prototype.id,
  PessoaRelations
> {

  public readonly diretor: HasOneRepositoryFactory<Diretor, typeof Pessoa.prototype.id>;

  public readonly artista: HasOneRepositoryFactory<Artista, typeof Pessoa.prototype.id>;

  public readonly usuario: HasOneRepositoryFactory<Usuario, typeof Pessoa.prototype.id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('DiretorRepository') protected diretorRepositoryGetter: Getter<DiretorRepository>, @repository.getter('ArtistaRepository') protected artistaRepositoryGetter: Getter<ArtistaRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Pessoa, dataSource);
    this.usuario = this.createHasOneRepositoryFactoryFor('usuario', usuarioRepositoryGetter);
    this.artista = this.createHasOneRepositoryFactoryFor('artista', artistaRepositoryGetter);
    this.diretor = this.createHasOneRepositoryFactoryFor('diretor', diretorRepositoryGetter);
  }
}
