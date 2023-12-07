import {Entity, model, property, hasOne} from '@loopback/repository';
import {Avaliacao} from './avaliacao.model';

@model()
export class Usuario extends Entity {
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
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  senha: string;

  @property({
    type: 'number',
  })
  id_pessoa?: number;

  @hasOne(() => Avaliacao, {keyTo: 'id_usuario'})
  avaliacao: Avaliacao;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
