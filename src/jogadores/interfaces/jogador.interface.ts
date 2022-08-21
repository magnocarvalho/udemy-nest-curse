/**
 * Todos os campos do objeto Jogador
 *
 * @export
 * @interface Jogador
 */
export interface Jogador {
	readonly _id: string;
	readonly telefoneCelular: string;
	readonly email: string;
	nome: string;
	ranking?: string;
	posicaoRanking?: string;
	urlFotoJogador?: string;
}
