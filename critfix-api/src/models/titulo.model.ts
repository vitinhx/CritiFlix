import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Avaliacao} from './avaliacao.model';
import {Genero} from './genero.model';
import {TituloGenero} from './titulo-genero.model';

@model()
export class Titulo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      dataType: "real"
    },
  })
  orcamento: number;

  @property({
    type: 'date',
    required: true,
  })
  data_lancamento: string;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      dataType: "real"
    },
  })
  nota_media: number;

  @property({
    type: 'string',
    required: true,
  })
  sinopse: string;

  @property({
    type: 'string'
  })
  where_view: string;

  @property({
    type: 'string'
  })
  poster: string;

  @hasMany(() => Genero, {through: {model: () => TituloGenero}})
  generos: Genero[];

  @hasOne(() => Avaliacao, {keyTo: 'id_titulo'})
  avaliacao: Avaliacao;

  constructor(data?: Partial<Titulo>) {
    super(data);
  }
}

export interface TituloRelations {
  // describe navigational properties here
}

export type TituloWithRelations = Titulo & TituloRelations;
