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
import {Titulo} from '../models';
import {GeneroRepository, TituloGeneroRepository, TituloRepository} from '../repositories';

export class TituloController {
  constructor(
    @repository(TituloRepository)
    public tituloRepository: TituloRepository,

    @repository(GeneroRepository)
    public generoRepository: GeneroRepository,

    @repository(TituloGeneroRepository)
    public tituloGeneroRepository: TituloGeneroRepository,
  ) { }

  @post('/titulos')
  @response(200, {
    description: 'Titulo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Titulo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Titulo, {
            title: 'NewTitulo',
            exclude: ['id'],
          }),
        },
      },
    })
    titulo: Omit<Titulo, 'id'>,
  ): Promise<Titulo> {
    return this.tituloRepository.create(titulo);
  }

  @get('/titulos/count')
  @response(200, {
    description: 'Titulo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Titulo) where?: Where<Titulo>,
  ): Promise<Count> {
    return this.tituloRepository.count(where);
  }

  @get('/titulos')
  @response(200, {
    description: 'Array of Titulo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Titulo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Titulo) filter?: Filter<Titulo>,
  ): Promise<Titulo[]> {
    const generos = await this.generoRepository.find();
    const titulos = await this.tituloRepository.find();

    for (let i = 0; i < titulos.length; i++) {
      const tituloGeneros = await this.tituloGeneroRepository.find({where: {tituloId: titulos[i].id}});
      const generosDoTitulo = tituloGeneros.map((i) => generos.filter((g) => g.id === i.generoId)[0]);

      titulos[i].generos = generosDoTitulo;
    }

    return titulos;
  }

  @patch('/titulos')
  @response(200, {
    description: 'Titulo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Titulo, {partial: true}),
        },
      },
    })
    titulo: Titulo,
    @param.where(Titulo) where?: Where<Titulo>,
  ): Promise<Count> {
    return this.tituloRepository.updateAll(titulo, where);
  }

  @get('/titulos/{id}')
  @response(200, {
    description: 'Titulo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Titulo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Titulo, {exclude: 'where'}) filter?: FilterExcludingWhere<Titulo>
  ): Promise<Titulo> {
    return this.tituloRepository.findById(id, filter);
  }

  @patch('/titulos/{id}')
  @response(204, {
    description: 'Titulo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Titulo, {partial: true}),
        },
      },
    })
    titulo: Titulo,
  ): Promise<void> {
    await this.tituloRepository.updateById(id, titulo);
  }

  @put('/titulos/{id}')
  @response(204, {
    description: 'Titulo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() titulo: Titulo,
  ): Promise<void> {
    await this.tituloRepository.replaceById(id, titulo);
  }

  @del('/titulos/{id}')
  @response(204, {
    description: 'Titulo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tituloRepository.deleteById(id);
  }
}
