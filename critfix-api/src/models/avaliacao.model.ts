import {Entity, model, property} from '@loopback/repository';

@model()
export class Avaliacao extends Entity {
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
  descricao: string;

  @property({
    type: 'number',
    postgresql: {
      dataType: "real"
    },
    required: true,
  })
  nota: number;

  @property({
    type: 'number',
  })
  id_usuario?: number;

  @property({
    type: 'number',
  })
  id_titulo?: number;

  constructor(data?: Partial<Avaliacao>) {
    super(data);
  }
}

export interface AvaliacaoRelations {
  // describe navigational properties here
}

export type AvaliacaoWithRelations = Avaliacao & AvaliacaoRelations;
