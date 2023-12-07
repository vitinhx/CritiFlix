import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {TituloGenero} from '../models';
import {TituloGeneroRepository} from '../repositories';

export class TituloGeneroController {
  constructor(
    @repository(TituloGeneroRepository)
    public tituloGeneroRepository: TituloGeneroRepository,
  ) { }

  @post('/titulo-generos')
  @response(200, {
    description: 'TituloGenero model instance',
    content: {'application/json': {schema: getModelSchemaRef(TituloGenero)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TituloGenero, {
            title: 'NewTituloGenero'
          }),
        },
      },
    })
    tituloGenero: Omit<TituloGenero, 'id'>,
  ): Promise<TituloGenero> {
    return this.tituloGeneroRepository.create(tituloGenero);
  }

  @get('/titulo-generos/count')
  @response(200, {
    description: 'TituloGenero model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TituloGenero) where?: Where<TituloGenero>,
  ): Promise<Count> {
    return this.tituloGeneroRepository.count(where);
  }

  @get('/titulo-generos')
  @response(200, {
    description: 'Array of TituloGenero model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TituloGenero, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TituloGenero) filter?: Filter<TituloGenero>,
  ): Promise<TituloGenero[]> {
    return this.tituloGeneroRepository.find(filter);
  }

  @patch('/titulo-generos')
  @response(200, {
    description: 'TituloGenero PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TituloGenero, {partial: true}),
        },
      },
    })
    tituloGenero: TituloGenero,
    @param.where(TituloGenero) where?: Where<TituloGenero>,
  ): Promise<Count> {
    return this.tituloGeneroRepository.updateAll(tituloGenero, where);
  }

  @get('/titulo-generos/{id}')
  @response(200, {
    description: 'TituloGenero model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TituloGenero, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TituloGenero, {exclude: 'where'}) filter?: FilterExcludingWhere<TituloGenero>
  ): Promise<TituloGenero> {
    return this.tituloGeneroRepository.findById(id, filter);
  }

  @patch('/titulo-generos/{id}')
  @response(204, {
    description: 'TituloGenero PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TituloGenero, {partial: true}),
        },
      },
    })
    tituloGenero: TituloGenero,
  ): Promise<void> {
    await this.tituloGeneroRepository.updateById(id, tituloGenero);
  }

  @put('/titulo-generos/{id}')
  @response(204, {
    description: 'TituloGenero PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tituloGenero: TituloGenero,
  ): Promise<void> {
    await this.tituloGeneroRepository.replaceById(id, tituloGenero);
  }

  @del('/titulo-generos/{id}')
  @response(204, {
    description: 'TituloGenero DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tituloGeneroRepository.deleteById(id);
  }
}
