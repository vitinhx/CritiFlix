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
import {Diretor} from '../models';
import {DiretorRepository} from '../repositories';

export class DiretorController {
  constructor(
    @repository(DiretorRepository)
    public diretorRepository : DiretorRepository,
  ) {}

  @post('/diretors')
  @response(200, {
    description: 'Diretor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Diretor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Diretor, {
            title: 'NewDiretor',
            exclude: ['id'],
          }),
        },
      },
    })
    diretor: Omit<Diretor, 'id'>,
  ): Promise<Diretor> {
    return this.diretorRepository.create(diretor);
  }

  @get('/diretors/count')
  @response(200, {
    description: 'Diretor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Diretor) where?: Where<Diretor>,
  ): Promise<Count> {
    return this.diretorRepository.count(where);
  }

  @get('/diretors')
  @response(200, {
    description: 'Array of Diretor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Diretor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Diretor) filter?: Filter<Diretor>,
  ): Promise<Diretor[]> {
    return this.diretorRepository.find(filter);
  }

  @patch('/diretors')
  @response(200, {
    description: 'Diretor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Diretor, {partial: true}),
        },
      },
    })
    diretor: Diretor,
    @param.where(Diretor) where?: Where<Diretor>,
  ): Promise<Count> {
    return this.diretorRepository.updateAll(diretor, where);
  }

  @get('/diretors/{id}')
  @response(200, {
    description: 'Diretor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Diretor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Diretor, {exclude: 'where'}) filter?: FilterExcludingWhere<Diretor>
  ): Promise<Diretor> {
    return this.diretorRepository.findById(id, filter);
  }

  @patch('/diretors/{id}')
  @response(204, {
    description: 'Diretor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Diretor, {partial: true}),
        },
      },
    })
    diretor: Diretor,
  ): Promise<void> {
    await this.diretorRepository.updateById(id, diretor);
  }

  @put('/diretors/{id}')
  @response(204, {
    description: 'Diretor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() diretor: Diretor,
  ): Promise<void> {
    await this.diretorRepository.replaceById(id, diretor);
  }

  @del('/diretors/{id}')
  @response(204, {
    description: 'Diretor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.diretorRepository.deleteById(id);
  }
}
