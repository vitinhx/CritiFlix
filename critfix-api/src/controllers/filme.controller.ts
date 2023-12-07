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
import {Filme} from '../models';
import {FilmeRepository, GeneroRepository, TituloGeneroRepository, TituloRepository} from '../repositories';

export class FilmeController {
  constructor(
    @repository(FilmeRepository)
    public filmeRepository: FilmeRepository,

    @repository(GeneroRepository)
    public generoRepository: GeneroRepository,

    @repository(TituloGeneroRepository)
    public tituloGeneroRepository: TituloGeneroRepository,

    @repository(TituloRepository)
    public tituloRepository: TituloRepository,
  ) { }

  @post('/filmes')
  @response(200, {
    description: 'Filme model instance',
    content: {'application/json': {schema: getModelSchemaRef(Filme)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Filme, {
            title: 'NewFilme',
            exclude: ['id'],
          }),
        },
      },
    })
    filme: Omit<Filme, 'id'>,
  ): Promise<Filme> {
    return this.filmeRepository.create(filme);
  }

  @get('/filmes/count')
  @response(200, {
    description: 'Filme model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Filme) where?: Where<Filme>,
  ): Promise<Count> {
    return this.filmeRepository.count(where);
  }

  @get('/filmes')
  @response(200, {
    description: 'Array of Filme model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Filme, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Filme) filter?: Filter<Filme>,
  ): Promise<any> {
    const generos = await this.generoRepository.find();
    const filmes = await this.filmeRepository.find(filter);
    const response = [];

    for (let i = 0; i < filmes.length; i++) {
      const tituloGeneros = await this.tituloGeneroRepository.find({where: {tituloId: filmes[i].id_titulo}});
      const generosDoTitulo = tituloGeneros.map((i) => generos.filter((g) => g.id === i.generoId)[0]);

      response.push({...filmes[i], generos: generosDoTitulo});
    }

    return response;
  }

  @patch('/filmes')
  @response(200, {
    description: 'Filme PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Filme, {partial: true}),
        },
      },
    })
    filme: Filme,
    @param.where(Filme) where?: Where<Filme>,
  ): Promise<Count> {
    return this.filmeRepository.updateAll(filme, where);
  }

  @get('/filmes/{id}')
  @response(200, {
    description: 'Filme model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Filme, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Filme, {exclude: 'where'}) filter?: FilterExcludingWhere<Filme>
  ): Promise<any> {
    const generos = await this.generoRepository.find();
    const filme = await this.filmeRepository.findById(id, filter);
    const titulo = await this.tituloRepository.findById(filme.id_titulo);
    const tituloGeneros = await this.tituloGeneroRepository.find({where: {tituloId: filme.id_titulo}});
    const generosDoTitulo = tituloGeneros.map((i) => generos.filter((g) => g.id === i.generoId)[0]);

    let response: any = {
      ...filme,
      generos: generosDoTitulo,
      titulo: titulo
    };

    return response;
  }

  @patch('/filmes/{id}')
  @response(204, {
    description: 'Filme PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Filme, {partial: true}),
        },
      },
    })
    filme: Filme,
  ): Promise<void> {
    await this.filmeRepository.updateById(id, filme);
  }

  @put('/filmes/{id}')
  @response(204, {
    description: 'Filme PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() filme: Filme,
  ): Promise<void> {
    await this.filmeRepository.replaceById(id, filme);
  }

  @del('/filmes/{id}')
  @response(204, {
    description: 'Filme DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.filmeRepository.deleteById(id);
  }
}
