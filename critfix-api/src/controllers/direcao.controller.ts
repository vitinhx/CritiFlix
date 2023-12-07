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
import {Direcao} from '../models';
import {DirecaoRepository} from '../repositories';

export class DirecaoController {
  constructor(
    @repository(DirecaoRepository)
    public direcaoRepository: DirecaoRepository,
  ) { }

  @post('/direcaos')
  @response(200, {
    description: 'Direcao model instance',
    content: {'application/json': {schema: getModelSchemaRef(Direcao)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Direcao, {
            title: 'NewDirecao'
          }),
        },
      },
    })
    direcao: Omit<Direcao, 'id'>,
  ): Promise<Direcao> {
    return this.direcaoRepository.create(direcao);
  }

  @get('/direcaos/count')
  @response(200, {
    description: 'Direcao model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Direcao) where?: Where<Direcao>,
  ): Promise<Count> {
    return this.direcaoRepository.count(where);
  }

  @get('/direcaos')
  @response(200, {
    description: 'Array of Direcao model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Direcao, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Direcao) filter?: Filter<Direcao>,
  ): Promise<Direcao[]> {
    return this.direcaoRepository.find(filter);
  }

  @patch('/direcaos')
  @response(200, {
    description: 'Direcao PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Direcao, {partial: true}),
        },
      },
    })
    direcao: Direcao,
    @param.where(Direcao) where?: Where<Direcao>,
  ): Promise<Count> {
    return this.direcaoRepository.updateAll(direcao, where);
  }

  @get('/direcaos/{id}')
  @response(200, {
    description: 'Direcao model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Direcao, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Direcao, {exclude: 'where'}) filter?: FilterExcludingWhere<Direcao>
  ): Promise<Direcao> {
    return this.direcaoRepository.findById(id, filter);
  }

  @patch('/direcaos/{id}')
  @response(204, {
    description: 'Direcao PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Direcao, {partial: true}),
        },
      },
    })
    direcao: Direcao,
  ): Promise<void> {
    await this.direcaoRepository.updateById(id, direcao);
  }

  @put('/direcaos/{id}')
  @response(204, {
    description: 'Direcao PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() direcao: Direcao,
  ): Promise<void> {
    await this.direcaoRepository.replaceById(id, direcao);
  }

  @del('/direcaos/{id}')
  @response(204, {
    description: 'Direcao DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.direcaoRepository.deleteById(id);
  }
}
