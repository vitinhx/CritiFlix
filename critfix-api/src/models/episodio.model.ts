import {Entity, model, property} from '@loopback/repository';

@model()
export class Episodio extends Entity {
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
    type: 'number',
    required: true,
  })
  duracao: number;

  @property({
    type: 'string',
    required: true,
  })
  sinopse: string;

  @property({
    type: 'number',
  })
  id_temporada?: number;

  constructor(data?: Partial<Episodio>) {
    super(data);
  }
}

export interface EpisodioRelations {
  // describe navigational properties here
}

export type EpisodioWithRelations = Episodio & EpisodioRelations;
