import {Entity, model, property, hasOne} from '@loopback/repository';
import {Diretor} from './diretor.model';
import {Artista} from './artista.model';
import {Usuario} from './usuario.model';

@model()
export class Pessoa extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  sexo: string;

  @property({
    type: 'date',
    required: true,
  })
  data_nasc: string;

  @hasOne(() => Diretor, {keyTo: 'id_pessoa'})
  diretor: Diretor;

  @hasOne(() => Artista, {keyTo: 'id_pessoa'})
  artista: Artista;

  @hasOne(() => Usuario, {keyTo: 'id_pessoa'})
  usuario: Usuario;

  constructor(data?: Partial<Pessoa>) {
    super(data);
  }
}

export interface PessoaRelations {
  // describe navigational properties here
}

export type PessoaWithRelations = Pessoa & PessoaRelations;
