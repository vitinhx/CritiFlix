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
import {Genero} from '../models';
import {GeneroRepository} from '../repositories';

export class GeneroController {
  constructor(
    @repository(GeneroRepository)
    public generoRepository : GeneroRepository,
  ) {}

  @post('/generos')
  @response(200, {
    description: 'Genero model instance',
    content: {'application/json': {schema: getModelSchemaRef(Genero)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Genero, {
            title: 'NewGenero',
            exclude: ['id'],
          }),
        },
      },
    })
    genero: Omit<Genero, 'id'>,
  ): Promise<Genero> {
    return this.generoRepository.create(genero);
  }

  @get('/generos/count')
  @response(200, {
    description: 'Genero model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Genero) where?: Where<Genero>,
  ): Promise<Count> {
    return this.generoRepository.count(where);
  }

  @get('/generos')
  @response(200, {
    description: 'Array of Genero model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Genero, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Genero) filter?: Filter<Genero>,
  ): Promise<Genero[]> {
    return this.generoRepository.find(filter);
  }

  @patch('/generos')
  @response(200, {
    description: 'Genero PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Genero, {partial: true}),
        },
      },
    })
    genero: Genero,
    @param.where(Genero) where?: Where<Genero>,
  ): Promise<Count> {
    return this.generoRepository.updateAll(genero, where);
  }

  @get('/generos/{id}')
  @response(200, {
    description: 'Genero model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Genero, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Genero, {exclude: 'where'}) filter?: FilterExcludingWhere<Genero>
  ): Promise<Genero> {
    return this.generoRepository.findById(id, filter);
  }

  @patch('/generos/{id}')
  @response(204, {
    description: 'Genero PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Genero, {partial: true}),
        },
      },
    })
    genero: Genero,
  ): Promise<void> {
    await this.generoRepository.updateById(id, genero);
  }

  @put('/generos/{id}')
  @response(204, {
    description: 'Genero PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() genero: Genero,
  ): Promise<void> {
    await this.generoRepository.replaceById(id, genero);
  }

  @del('/generos/{id}')
  @response(204, {
    description: 'Genero DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.generoRepository.deleteById(id);
  }
}
