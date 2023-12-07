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
  Artista,
} from '../models';
import {PessoaRepository} from '../repositories';

export class PessoaArtistaController {
  constructor(
    @repository(PessoaRepository) protected pessoaRepository: PessoaRepository,
  ) { }

  @get('/pessoas/{id}/artista', {
    responses: {
      '200': {
        description: 'Pessoa has one Artista',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Artista),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Artista>,
  ): Promise<Artista> {
    return this.pessoaRepository.artista(id).get(filter);
  }

  @post('/pessoas/{id}/artista', {
    responses: {
      '200': {
        description: 'Pessoa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Artista)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Pessoa.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Artista, {
            title: 'NewArtistaInPessoa',
            exclude: ['id'],
            optional: ['id_pessoa']
          }),
        },
      },
    }) artista: Omit<Artista, 'id'>,
  ): Promise<Artista> {
    return this.pessoaRepository.artista(id).create(artista);
  }

  @patch('/pessoas/{id}/artista', {
    responses: {
      '200': {
        description: 'Pessoa.Artista PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Artista, {partial: true}),
        },
      },
    })
    artista: Partial<Artista>,
    @param.query.object('where', getWhereSchemaFor(Artista)) where?: Where<Artista>,
  ): Promise<Count> {
    return this.pessoaRepository.artista(id).patch(artista, where);
  }

  @del('/pessoas/{id}/artista', {
    responses: {
      '200': {
        description: 'Pessoa.Artista DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Artista)) where?: Where<Artista>,
  ): Promise<Count> {
    return this.pessoaRepository.artista(id).delete(where);
  }
}
