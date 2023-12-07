import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Temporada} from '../models';
import {TemporadaRepository} from '../repositories';

export class TemporadaController {
  constructor(
    @repository(TemporadaRepository)
    public temporadaRepository : TemporadaRepository,
  ) {}

  @post('/temporadas')
  @response(200, {
    description: 'Temporada model instance',
    content: {'application/json': {schema: getModelSchemaRef(Temporada)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Temporada, {
            title: 'NewTemporada',
            exclude: ['id'],
          }),
        },
      },
    })
    temporada: Omit<Temporada, 'id'>,
  ): Promise<Temporada> {
    return this.temporadaRepository.create(temporada);
  }

  @get('/temporadas/count')
  @response(200, {
    description: 'Temporada model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Temporada) where?: Where<Temporada>,
  ): Promise<Count> {
    return this.temporadaRepository.count(where);
  }

  @get('/temporadas')
  @response(200, {
    description: 'Array of Temporada model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Temporada, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Temporada) filter?: Filter<Temporada>,
  ): Promise<Temporada[]> {
    return this.temporadaRepository.find(filter);
  }

  @patch('/temporadas')
  @response(200, {
    description: 'Temporada PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Temporada, {partial: true}),
        },
      },
    })
    temporada: Temporada,
    @param.where(Temporada) where?: Where<Temporada>,
  ): Promise<Count> {
    return this.temporadaRepository.updateAll(temporada, where);
  }

  @get('/temporadas/{id}')
  @response(200, {
    description: 'Temporada model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Temporada, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Temporada, {exclude: 'where'}) filter?: FilterExcludingWhere<Temporada>
  ): Promise<Temporada> {
    return this.temporadaRepository.findById(id, filter);
  }

  @patch('/temporadas/{id}')
  @response(204, {
    description: 'Temporada PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Temporada, {partial: true}),
        },
      },
    })
    temporada: Temporada,
  ): Promise<void> {
    await this.temporadaRepository.updateById(id, temporada);
  }

  @put('/temporadas/{id}')
  @response(204, {
    description: 'Temporada PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() temporada: Temporada,
  ): Promise<void> {
    await this.temporadaRepository.replaceById(id, temporada);
  }

  @del('/temporadas/{id}')
  @response(204, {
    description: 'Temporada DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.temporadaRepository.deleteById(id);
  }
}
