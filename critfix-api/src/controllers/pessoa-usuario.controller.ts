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
  Pessoa,
  Usuario,
} from '../models';
import {PessoaRepository} from '../repositories';

export class PessoaUsuarioController {
  constructor(
    @repository(PessoaRepository) protected pessoaRepository: PessoaRepository,
  ) { }

  @get('/pessoas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Pessoa has one Usuario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuario),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario> {
    return this.pessoaRepository.usuario(id).get(filter);
  }

  @post('/pessoas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Pessoa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Pessoa.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInPessoa',
            exclude: ['id'],
            optional: ['id_pessoa']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    return this.pessoaRepository.usuario(id).create(usuario);
  }

  @patch('/pessoas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Pessoa.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.pessoaRepository.usuario(id).patch(usuario, where);
  }

  @del('/pessoas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Pessoa.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.pessoaRepository.usuario(id).delete(where);
  }
}
