import {Entity, model, property} from '@loopback/repository';

@model()
export class Genero extends Entity {
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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Genero>) {
    super(data);
  }
}

export interface GeneroRelations {
  // describe navigational properties here
}

export type GeneroWithRelations = Genero & GeneroRelations;
