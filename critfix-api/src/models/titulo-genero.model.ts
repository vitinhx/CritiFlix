import {Entity, model, property} from '@loopback/repository';

@model()
export class TituloGenero extends Entity {

  @property({
    type: 'number',
    id: true
  })
  tituloId?: number;

  @property({
    type: 'number',
    id: true
  })
  generoId?: number;

  constructor(data?: Partial<TituloGenero>) {
    super(data);
  }
}

export interface TituloGeneroRelations {
  // describe navigational properties here
}

export type TituloGeneroWithRelations = TituloGenero & TituloGeneroRelations;
