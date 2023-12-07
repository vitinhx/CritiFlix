import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Filme,
  Titulo,
} from '../models';
import {FilmeRepository} from '../repositories';

export class FilmeTituloController {
  constructor(
    @repository(FilmeRepository)
    public filmeRepository: FilmeRepository,
  ) { }

  @get('/filmes/{id}/titulo', {
    responses: {
      '200': {
        description: 'Titulo belonging to Filme',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Titulo),
          },
        },
      },
    },
  })
  async getTitulo(
    @param.path.number('id') id: typeof Filme.prototype.id,
  ): Promise<Titulo> {
    return this.filmeRepository.titulo(id);
  }
}
