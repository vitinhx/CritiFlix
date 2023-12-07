import {Entity, hasMany, model, property} from '@loopback/repository';
import {Direcao} from './direcao.model';
import {Titulo} from './titulo.model';

@model()
export class Diretor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      dataType: "real"
    },
  })
  altura: number;

  @property({
    type: 'string',
  })
  apelido?: string;

  @property({
    type: 'string',
    required: true,
  })
  biografia: string;

  @property({
    type: 'string',
    required: true,
  })
  nacionalidade: string;

  @hasMany(() => Titulo, {through: {model: () => Direcao}})
  titulos: Titulo[];

  @property({
    type: 'number',
  })
  id_pessoa?: number;

  constructor(data?: Partial<Diretor>) {
    super(data);
  }
}

export interface DiretorRelations {
  // describe navigational properties here
}

export type DiretorWithRelations = Diretor & DiretorRelations;
