import {Entity, hasMany, model, property} from '@loopback/repository';
import {Atuacao} from './atuacao.model';
import {Titulo} from './titulo.model';

@model()
export class Artista extends Entity {
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
    }
  })
  altura: number;

  @property({
    type: 'string',
    required: true,
  })
  nacionalidade: string;

  @hasMany(() => Titulo, {through: {model: () => Atuacao}})
  titulos: Titulo[];

  @property({
    type: 'number',
  })
  id_pessoa?: number;

  constructor(data?: Partial<Artista>) {
    super(data);
  }
}

export interface ArtistaRelations {
  // describe navigational properties here
}

export type ArtistaWithRelations = Artista & ArtistaRelations;
