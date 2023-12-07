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
  Usuario,
  Avaliacao,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioAvaliacaoController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/avaliacao', {
    responses: {
      '200': {
        description: 'Usuario has one Avaliacao',
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
    return this.usuarioRepository.avaliacao(id).get(filter);
  }

  @post('/usuarios/{id}/avaliacao', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Avaliacao)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Avaliacao, {
            title: 'NewAvaliacaoInUsuario',
            exclude: ['id'],
            optional: ['id_usuario']
          }),
        },
      },
    }) avaliacao: Omit<Avaliacao, 'id'>,
  ): Promise<Avaliacao> {
    return this.usuarioRepository.avaliacao(id).create(avaliacao);
  }

  @patch('/usuarios/{id}/avaliacao', {
    responses: {
      '200': {
        description: 'Usuario.Avaliacao PATCH success count',
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
    return this.usuarioRepository.avaliacao(id).patch(avaliacao, where);
  }

  @del('/usuarios/{id}/avaliacao', {
    responses: {
      '200': {
        description: 'Usuario.Avaliacao DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Avaliacao)) where?: Where<Avaliacao>,
  ): Promise<Count> {
    return this.usuarioRepository.avaliacao(id).delete(where);
  }
}
