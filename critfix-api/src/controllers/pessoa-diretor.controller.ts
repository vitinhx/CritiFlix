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
  Diretor,
} from '../models';
import {PessoaRepository} from '../repositories';

export class PessoaDiretorController {
  constructor(
    @repository(PessoaRepository) protected pessoaRepository: PessoaRepository,
  ) { }

  @get('/pessoas/{id}/diretor', {
    responses: {
      '200': {
        description: 'Pessoa has one Diretor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Diretor),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Diretor>,
  ): Promise<Diretor> {
    return this.pessoaRepository.diretor(id).get(filter);
  }

  @post('/pessoas/{id}/diretor', {
    responses: {
      '200': {
        description: 'Pessoa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Diretor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Pessoa.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Diretor, {
            title: 'NewDiretorInPessoa',
            exclude: ['id'],
            optional: ['id_pessoa']
          }),
        },
      },
    }) diretor: Omit<Diretor, 'id'>,
  ): Promise<Diretor> {
    return this.pessoaRepository.diretor(id).create(diretor);
  }

  @patch('/pessoas/{id}/diretor', {
    responses: {
      '200': {
        description: 'Pessoa.Diretor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Diretor, {partial: true}),
        },
      },
    })
    diretor: Partial<Diretor>,
    @param.query.object('where', getWhereSchemaFor(Diretor)) where?: Where<Diretor>,
  ): Promise<Count> {
    return this.pessoaRepository.diretor(id).patch(diretor, where);
  }

  @del('/pessoas/{id}/diretor', {
    responses: {
      '200': {
        description: 'Pessoa.Diretor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Diretor)) where?: Where<Diretor>,
  ): Promise<Count> {
    return this.pessoaRepository.diretor(id).delete(where);
  }
}
