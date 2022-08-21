import { Document } from "mongoose";
/**
 * Todos os campos do objeto Jogador
 *
 * @export
 * @interface Jogador
 */
export interface Jogador extends Document {
	readonly telefoneCelular: string;
	readonly email: string;
	nome: string;
	ranking?: string;
	posicaoRanking?: number;
	urlFotoJogador?: string;
}
