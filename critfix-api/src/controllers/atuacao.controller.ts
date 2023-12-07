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
import {Atuacao} from '../models';
import {AtuacaoRepository} from '../repositories';

export class AtuacaoController {
  constructor(
    @repository(AtuacaoRepository)
    public atuacaoRepository: AtuacaoRepository,
  ) { }

  @post('/atuacaos')
  @response(200, {
    description: 'Atuacao model instance',
    content: {'application/json': {schema: getModelSchemaRef(Atuacao)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atuacao, {
            title: 'NewAtuacao'
          }),
        },
      },
    })
    atuacao: Omit<Atuacao, 'id'>,
  ): Promise<Atuacao> {
    return this.atuacaoRepository.create(atuacao);
  }

  @get('/atuacaos/count')
  @response(200, {
    description: 'Atuacao model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Atuacao) where?: Where<Atuacao>,
  ): Promise<Count> {
    return this.atuacaoRepository.count(where);
  }

  @get('/atuacaos')
  @response(200, {
    description: 'Array of Atuacao model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Atuacao, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Atuacao) filter?: Filter<Atuacao>,
  ): Promise<Atuacao[]> {
    return this.atuacaoRepository.find(filter);
  }

  @patch('/atuacaos')
  @response(200, {
    description: 'Atuacao PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atuacao, {partial: true}),
        },
      },
    })
    atuacao: Atuacao,
    @param.where(Atuacao) where?: Where<Atuacao>,
  ): Promise<Count> {
    return this.atuacaoRepository.updateAll(atuacao, where);
  }

  @get('/atuacaos/{id}')
  @response(200, {
    description: 'Atuacao model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Atuacao, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Atuacao, {exclude: 'where'}) filter?: FilterExcludingWhere<Atuacao>
  ): Promise<Atuacao> {
    return this.atuacaoRepository.findById(id, filter);
  }

  @patch('/atuacaos/{id}')
  @response(204, {
    description: 'Atuacao PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atuacao, {partial: true}),
        },
      },
    })
    atuacao: Atuacao,
  ): Promise<void> {
    await this.atuacaoRepository.updateById(id, atuacao);
  }

  @put('/atuacaos/{id}')
  @response(204, {
    description: 'Atuacao PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() atuacao: Atuacao,
  ): Promise<void> {
    await this.atuacaoRepository.replaceById(id, atuacao);
  }

  @del('/atuacaos/{id}')
  @response(204, {
    description: 'Atuacao DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.atuacaoRepository.deleteById(id);
  }
}
