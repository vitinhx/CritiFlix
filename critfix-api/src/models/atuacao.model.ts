import {Entity, model, property} from '@loopback/repository';

@model()
export class Atuacao extends Entity {

  @property({
    type: 'number',
    id: true
  })
  artistaId?: number;

  @property({
    type: 'number',
    id: true
  })
  tituloId?: number;

  constructor(data?: Partial<Atuacao>) {
    super(data);
  }
}

export interface AtuacaoRelations {
  // describe navigational properties here
}

export type AtuacaoWithRelations = Atuacao & AtuacaoRelations;
