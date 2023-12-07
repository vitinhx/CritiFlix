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
  Serie,
  Temporada,
} from '../models';
import {SerieRepository} from '../repositories';

export class SerieTemporadaController {
  constructor(
    @repository(SerieRepository) protected serieRepository: SerieRepository,
  ) { }

  @get('/series/{id}/temporada', {
    responses: {
      '200': {
        description: 'Serie has one Temporada',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Temporada),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Temporada>,
  ): Promise<Temporada> {
    return this.serieRepository.temporada(id).get(filter);
  }

  @post('/series/{id}/temporada', {
    responses: {
      '200': {
        description: 'Serie model instance',
        content: {'application/json': {schema: getModelSchemaRef(Temporada)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Serie.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Temporada, {
            title: 'NewTemporadaInSerie',
            exclude: ['id'],
            optional: ['id_serie']
          }),
        },
      },
    }) temporada: Omit<Temporada, 'id'>,
  ): Promise<Temporada> {
    return this.serieRepository.temporada(id).create(temporada);
  }

  @patch('/series/{id}/temporada', {
    responses: {
      '200': {
        description: 'Serie.Temporada PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Temporada, {partial: true}),
        },
      },
    })
    temporada: Partial<Temporada>,
    @param.query.object('where', getWhereSchemaFor(Temporada)) where?: Where<Temporada>,
  ): Promise<Count> {
    return this.serieRepository.temporada(id).patch(temporada, where);
  }

  @del('/series/{id}/temporada', {
    responses: {
      '200': {
        description: 'Serie.Temporada DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Temporada)) where?: Where<Temporada>,
  ): Promise<Count> {
    return this.serieRepository.temporada(id).delete(where);
  }
}
