import {Entity, hasOne, model, property, belongsTo} from '@loopback/repository';
import {Temporada} from './temporada.model';
import {Titulo} from './titulo.model';

@model()
export class Serie extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  quant_temporada: number;

  @property({
    type: 'number',
    required: true,
  })
  quant_episodio: number;

  @hasOne(() => Temporada, {keyTo: 'id_serie'})
  temporada: Temporada;

  @belongsTo(() => Titulo, {name: 'titulo'})
  id_titulo: number;

  constructor(data?: Partial<Serie>) {
    super(data);
  }
}

export interface SerieRelations {
  // describe navigational properties here
}

export type SerieWithRelations = Serie & SerieRelations;
