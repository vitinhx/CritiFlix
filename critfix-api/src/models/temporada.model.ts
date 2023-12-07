import {Entity, hasOne, model, property} from '@loopback/repository';
import {Episodio} from './episodio.model';

@model()
export class Temporada extends Entity {
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
  number: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'date',
    required: true,
  })
  data_lancamento: string;

  @property({
    type: 'number',
    required: true,
  })
  quant_episodio: number;

  @property({
    type: 'number',
  })
  id_serie?: number;

  @hasOne(() => Episodio, {keyTo: 'id_temporada'})
  episodio: Episodio;

  constructor(data?: Partial<Temporada>) {
    super(data);
  }
}

export interface TemporadaRelations {
  // describe navigational properties here
}

export type TemporadaWithRelations = Temporada & TemporadaRelations;
