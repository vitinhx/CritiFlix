import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Titulo} from './titulo.model';

@model()
export class Filme extends Entity {
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
  duracao: number;

  @property({
    type: 'number',
    required: true,
  })
  ano_producao_inicial: number;

  @property({
    type: 'number',
    required: true,
  })
  ano_producao_final: number;

  @property({
    type: 'string',
    required: true,
  })
  distribuidor: string;

  @belongsTo(() => Titulo, {name: 'titulo'})
  id_titulo: number;

  constructor(data?: Partial<Filme>) {
    super(data);
  }
}

export interface FilmeRelations {
  // describe navigational properties here
}

export type FilmeWithRelations = Filme & FilmeRelations;
