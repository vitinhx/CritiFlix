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
import {Avaliacao} from '../models';
import {AvaliacaoRepository} from '../repositories';

export class AvaliacaoController {
  constructor(
    @repository(AvaliacaoRepository)
    public avaliacaoRepository : AvaliacaoRepository,
  ) {}

  @post('/avaliacaos')
  @response(200, {
    description: 'Avaliacao model instance',
    content: {'application/json': {schema: getModelSchemaRef(Avaliacao)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Avaliacao, {
            title: 'NewAvaliacao',
            exclude: ['id'],
          }),
        },
      },
    })
    avaliacao: Omit<Avaliacao, 'id'>,
  ): Promise<Avaliacao> {
    return this.avaliacaoRepository.create(avaliacao);
  }

  @get('/avaliacaos/count')
  @response(200, {
    description: 'Avaliacao model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Avaliacao) where?: Where<Avaliacao>,
  ): Promise<Count> {
    return this.avaliacaoRepository.count(where);
  }

  @get('/avaliacaos')
  @response(200, {
    description: 'Array of Avaliacao model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Avaliacao, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Avaliacao) filter?: Filter<Avaliacao>,
  ): Promise<Avaliacao[]> {
    return this.avaliacaoRepository.find(filter);
  }

  @patch('/avaliacaos')
  @response(200, {
    description: 'Avaliacao PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Avaliacao, {partial: true}),
        },
      },
    })
    avaliacao: Avaliacao,
    @param.where(Avaliacao) where?: Where<Avaliacao>,
  ): Promise<Count> {
    return this.avaliacaoRepository.updateAll(avaliacao, where);
  }

  @get('/avaliacaos/{id}')
  @response(200, {
    description: 'Avaliacao model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Avaliacao, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Avaliacao, {exclude: 'where'}) filter?: FilterExcludingWhere<Avaliacao>
  ): Promise<Avaliacao> {
    return this.avaliacaoRepository.findById(id, filter);
  }

  @patch('/avaliacaos/{id}')
  @response(204, {
    description: 'Avaliacao PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Avaliacao, {partial: true}),
        },
      },
    })
    avaliacao: Avaliacao,
  ): Promise<void> {
    await this.avaliacaoRepository.updateById(id, avaliacao);
  }

  @put('/avaliacaos/{id}')
  @response(204, {
    description: 'Avaliacao PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() avaliacao: Avaliacao,
  ): Promise<void> {
    await this.avaliacaoRepository.replaceById(id, avaliacao);
  }

  @del('/avaliacaos/{id}')
  @response(204, {
    description: 'Avaliacao DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.avaliacaoRepository.deleteById(id);
  }
}
