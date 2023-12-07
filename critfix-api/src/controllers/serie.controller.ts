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
import {Serie} from '../models';
import {EpisodioRepository, GeneroRepository, SerieRepository, TemporadaRepository, TituloGeneroRepository, TituloRepository} from '../repositories';

export class SerieController {
  constructor(
    @repository(SerieRepository)
    public serieRepository: SerieRepository,
    @repository(TituloRepository)
    public tituloRepository: TituloRepository,

    @repository(GeneroRepository)
    public generoRepository: GeneroRepository,

    @repository(TituloGeneroRepository)
    public tituloGeneroRepository: TituloGeneroRepository,

    @repository(TemporadaRepository)
    public temporadaRepository: TemporadaRepository,

    @repository(EpisodioRepository)
    public episodioRepository: EpisodioRepository,
  ) { }

  @post('/series')
  @response(200, {
    description: 'Serie model instance',
    content: {'application/json': {schema: getModelSchemaRef(Serie)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Serie, {
            title: 'NewSerie',
            exclude: ['id'],
          }),
        },
      },
    })
    serie: Omit<Serie, 'id'>,
  ): Promise<Serie> {
    return this.serieRepository.create(serie);
  }

  @get('/series/count')
  @response(200, {
    description: 'Serie model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Serie) where?: Where<Serie>,
  ): Promise<Count> {
    return this.serieRepository.count(where);
  }

  @get('/series')
  @response(200, {
    description: 'Array of Serie model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Serie, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Serie) filter?: Filter<Serie>,
  ): Promise<any> {
    const generos = await this.generoRepository.find();
    const series = await this.serieRepository.find(filter);
    const response = [];

    for (let i = 0; i < series.length; i++) {
      const tituloGeneros = await this.tituloGeneroRepository.find({where: {tituloId: series[i].id_titulo}});
      const generosDoTitulo = tituloGeneros.map((i) => generos.filter((g) => g.id === i.generoId)[0]);

      response.push({...series[i], generos: generosDoTitulo});
    }

    return response;
  }

  @patch('/series')
  @response(200, {
    description: 'Serie PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Serie, {partial: true}),
        },
      },
    })
    serie: Serie,
    @param.where(Serie) where?: Where<Serie>,
  ): Promise<Count> {
    return this.serieRepository.updateAll(serie, where);
  }

  @get('/series/{id}')
  @response(200, {
    description: 'Serie model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Serie, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Serie, {exclude: 'where'}) filter?: FilterExcludingWhere<Serie>
  ): Promise<any> {
    const generos = await this.generoRepository.find();
    const serie = await this.serieRepository.findById(id, filter);
    const titulo = await this.tituloRepository.findById(serie.id_titulo);
    const temporadas = await this.temporadaRepository.find({where: {id_serie: serie.id}});
    const tituloGeneros = await this.tituloGeneroRepository.find({where: {tituloId: serie.id_titulo}});
    const generosDoTitulo = tituloGeneros.map((i) => generos.filter((g) => g.id === i.generoId)[0]);

    let response: any = {
      ...serie,
      generos: generosDoTitulo,
      titulo: titulo,
      temporadas: []
    };

    for (let i = 0; i < temporadas.length; i++) {
      const episodios = await this.episodioRepository.find({where: {id_temporada: temporadas[i].id}});
      response.temporadas.push({...temporadas[i], episodios: episodios})
    }

    return response;
  }

  @patch('/series/{id}')
  @response(204, {
    description: 'Serie PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Serie, {partial: true}),
        },
      },
    })
    serie: Serie,
  ): Promise<void> {
    await this.serieRepository.updateById(id, serie);
  }

  @put('/series/{id}')
  @response(204, {
    description: 'Serie PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() serie: Serie,
  ): Promise<void> {
    await this.serieRepository.replaceById(id, serie);
  }

  @del('/series/{id}')
  @response(204, {
    description: 'Serie DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.serieRepository.deleteById(id);
  }
}
