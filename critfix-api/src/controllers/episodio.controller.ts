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
import {Episodio} from '../models';
import {EpisodioRepository} from '../repositories';

export class EpisodioController {
  constructor(
    @repository(EpisodioRepository)
    public episodioRepository : EpisodioRepository,
  ) {}

  @post('/episodios')
  @response(200, {
    description: 'Episodio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Episodio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Episodio, {
            title: 'NewEpisodio',
            exclude: ['id'],
          }),
        },
      },
    })
    episodio: Omit<Episodio, 'id'>,
  ): Promise<Episodio> {
    return this.episodioRepository.create(episodio);
  }

  @get('/episodios/count')
  @response(200, {
    description: 'Episodio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Episodio) where?: Where<Episodio>,
  ): Promise<Count> {
    return this.episodioRepository.count(where);
  }

  @get('/episodios')
  @response(200, {
    description: 'Array of Episodio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Episodio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Episodio) filter?: Filter<Episodio>,
  ): Promise<Episodio[]> {
    return this.episodioRepository.find(filter);
  }

  @patch('/episodios')
  @response(200, {
    description: 'Episodio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Episodio, {partial: true}),
        },
      },
    })
    episodio: Episodio,
    @param.where(Episodio) where?: Where<Episodio>,
  ): Promise<Count> {
    return this.episodioRepository.updateAll(episodio, where);
  }

  @get('/episodios/{id}')
  @response(200, {
    description: 'Episodio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Episodio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Episodio, {exclude: 'where'}) filter?: FilterExcludingWhere<Episodio>
  ): Promise<Episodio> {
    return this.episodioRepository.findById(id, filter);
  }

  @patch('/episodios/{id}')
  @response(204, {
    description: 'Episodio PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Episodio, {partial: true}),
        },
      },
    })
    episodio: Episodio,
  ): Promise<void> {
    await this.episodioRepository.updateById(id, episodio);
  }

  @put('/episodios/{id}')
  @response(204, {
    description: 'Episodio PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() episodio: Episodio,
  ): Promise<void> {
    await this.episodioRepository.replaceById(id, episodio);
  }

  @del('/episodios/{id}')
  @response(204, {
    description: 'Episodio DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.episodioRepository.deleteById(id);
  }
}
