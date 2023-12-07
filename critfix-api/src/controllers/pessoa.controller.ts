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
import {Pessoa} from '../models';
import {PessoaRepository} from '../repositories';

export class PessoaController {
  constructor(
    @repository(PessoaRepository)
    public pessoaRepository : PessoaRepository,
  ) {}

  @post('/pessoas')
  @response(200, {
    description: 'Pessoa model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pessoa)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pessoa, {
            title: 'NewPessoa',
            exclude: ['id'],
          }),
        },
      },
    })
    pessoa: Omit<Pessoa, 'id'>,
  ): Promise<Pessoa> {
    return this.pessoaRepository.create(pessoa);
  }

  @get('/pessoas/count')
  @response(200, {
    description: 'Pessoa model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pessoa) where?: Where<Pessoa>,
  ): Promise<Count> {
    return this.pessoaRepository.count(where);
  }

  @get('/pessoas')
  @response(200, {
    description: 'Array of Pessoa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pessoa, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pessoa) filter?: Filter<Pessoa>,
  ): Promise<Pessoa[]> {
    return this.pessoaRepository.find(filter);
  }

  @patch('/pessoas')
  @response(200, {
    description: 'Pessoa PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pessoa, {partial: true}),
        },
      },
    })
    pessoa: Pessoa,
    @param.where(Pessoa) where?: Where<Pessoa>,
  ): Promise<Count> {
    return this.pessoaRepository.updateAll(pessoa, where);
  }

  @get('/pessoas/{id}')
  @response(200, {
    description: 'Pessoa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pessoa, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pessoa, {exclude: 'where'}) filter?: FilterExcludingWhere<Pessoa>
  ): Promise<Pessoa> {
    return this.pessoaRepository.findById(id, filter);
  }

  @patch('/pessoas/{id}')
  @response(204, {
    description: 'Pessoa PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pessoa, {partial: true}),
        },
      },
    })
    pessoa: Pessoa,
  ): Promise<void> {
    await this.pessoaRepository.updateById(id, pessoa);
  }

  @put('/pessoas/{id}')
  @response(204, {
    description: 'Pessoa PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pessoa: Pessoa,
  ): Promise<void> {
    await this.pessoaRepository.replaceById(id, pessoa);
  }

  @del('/pessoas/{id}')
  @response(204, {
    description: 'Pessoa DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pessoaRepository.deleteById(id);
  }
}
