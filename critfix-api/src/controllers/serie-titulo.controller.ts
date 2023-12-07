import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Serie,
  Titulo,
} from '../models';
import {SerieRepository} from '../repositories';

export class SerieTituloController {
  constructor(
    @repository(SerieRepository)
    public serieRepository: SerieRepository,
  ) { }

  @get('/series/{id}/titulo', {
    responses: {
      '200': {
        description: 'Titulo belonging to Serie',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Titulo),
          },
        },
      },
    },
  })
  async getTitulo(
    @param.path.number('id') id: typeof Serie.prototype.id,
  ): Promise<Titulo> {
    return this.serieRepository.titulo(id);
  }
}
