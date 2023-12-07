import {Entity, model, property} from '@loopback/repository';

@model()
export class Direcao extends Entity {

  @property({
    type: 'number',
    id: true
  })
  diretorId?: number;

  @property({
    type: 'number',
    id: true
  })
  tituloId?: number;

  constructor(data?: Partial<Direcao>) {
    super(data);
  }
}

export interface DirecaoRelations {
  // describe navigational properties here
}

export type DirecaoWithRelations = Direcao & DirecaoRelations;
