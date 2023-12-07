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
  Titulo,
  Avaliacao,
} from '../models';
import {TituloRepository} from '../repositories';

export class TituloAvaliacaoController {
  constructor(
    @repository(TituloRepository) protected tituloRepository: TituloRepository,
  ) { }

  @get('/titulos/{id}/avaliacao', {
    responses: {
      '200': {
        description: 'Titulo has one Avaliacao',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Avaliacao),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Avaliacao>,
  ): Promise<Avaliacao> {
    return this.tituloRepository.avaliacao(id).get(filter);
  }

  @post('/titulos/{id}/avaliacao', {
    responses: {
      '200': {
        description: 'Titulo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Avaliacao)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Titulo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Avaliacao, {
            title: 'NewAvaliacaoInTitulo',
            exclude: ['id'],
            optional: ['id_titulo']
          }),
        },
      },
    }) avaliacao: Omit<Avaliacao, 'id'>,
  ): Promise<Avaliacao> {
    return this.tituloRepository.avaliacao(id).create(avaliacao);
  }

  @patch('/titulos/{id}/avaliacao', {
    responses: {
      '200': {
        description: 'Titulo.Avaliacao PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Avaliacao, {partial: true}),
        },
      },
    })
    avaliacao: Partial<Avaliacao>,
    @param.query.object('where', getWhereSchemaFor(Avaliacao)) where?: Where<Avaliacao>,
  ): Promise<Count> {
    return this.tituloRepository.avaliacao(id).patch(avaliacao, where);
  }

  @del('/titulos/{id}/avaliacao', {
    responses: {
      '200': {
        description: 'Titulo.Avaliacao DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Avaliacao)) where?: Where<Avaliacao>,
  ): Promise<Count> {
    return this.tituloRepository.avaliacao(id).delete(where);
  }
}
