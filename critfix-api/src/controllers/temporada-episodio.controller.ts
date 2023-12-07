import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Temporada,
  Episodio,
} from '../models';
import {TemporadaRepository} from '../repositories';

export class TemporadaEpisodioController {
  constructor(
    @repository(TemporadaRepository) protected temporadaRepository: TemporadaRepository,
  ) { }

  @get('/temporadas/{id}/episodio', {
    responses: {
      '200': {
        description: 'Temporada has one Episodio',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Episodio),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Episodio>,
  ): Promise<Episodio> {
    return this.temporadaRepository.episodio(id).get(filter);
  }

  @post('/temporadas/{id}/episodio', {
    responses: {
      '200': {
        description: 'Temporada model instance',
        content: {'application/json': {schema: getModelSchemaRef(Episodio)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Temporada.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Episodio, {
            title: 'NewEpisodioInTemporada',
            exclude: ['id'],
            optional: ['id_temporada']
          }),
        },
      },
    }) episodio: Omit<Episodio, 'id'>,
  ): Promise<Episodio> {
    return this.temporadaRepository.episodio(id).create(episodio);
  }

  @patch('/temporadas/{id}/episodio', {
    responses: {
      '200': {
        description: 'Temporada.Episodio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Episodio, {partial: true}),
        },
      },
    })
    episodio: Partial<Episodio>,
    @param.query.object('where', getWhereSchemaFor(Episodio)) where?: Where<Episodio>,
  ): Promise<Count> {
    return this.temporadaRepository.episodio(id).patch(episodio, where);
  }

  @del('/temporadas/{id}/episodio', {
    responses: {
      '200': {
        description: 'Temporada.Episodio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Episodio)) where?: Where<Episodio>,
  ): Promise<Count> {
    return this.temporadaRepository.episodio(id).delete(where);
  }
}
