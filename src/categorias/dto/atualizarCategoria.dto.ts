import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";
import { Evento } from "../interfaces/categoria.interface";

export class AtualizarCategoriaDto {
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	descricao: string;

	@IsArray()
	@ArrayMinSize(1)
	eventos: Array<Evento>;

	@IsArray()
	jogadores: Array<Jogador>;
}
