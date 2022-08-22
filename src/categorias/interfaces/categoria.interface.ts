import { Document } from "mongoose";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";

export interface Categoria extends Document {
	readonly categoria: string;
	descricao: string;
	eventos: Array<Evento>;
	jogadores: Array<Jogador>;
}
/**
 * eventos: ARRAY de OBJETOS
 *
 * @export
 * @interface Evento
 */
export interface Evento {
	// @IsString()
	nome: string;
	operacao: string;
	valor: number;
}
