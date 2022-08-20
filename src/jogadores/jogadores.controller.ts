import { Body, Controller, Post } from "@nestjs/common";
import { CriarJogadorDto } from "./dtos/criar-jogador.dto";
import { ApiTags } from "@nestjs/swagger";
/**
 *
 *
 * @export
 * @class JogadoresController
 * @author Magneira <
 */
@Controller("api/v1/jogadores")
@ApiTags("Jogadores")
export class JogadoresController {
	/**
	 * Metodo responsavel pela criação de jogador na api
	 * @template {CriarJogadorDto}
	 * @param {CriarJogadorDto} criarJogadorDto
	 * @return {*}
	 * @memberof JogadoresController
	 * @author Magneira
	 * @argument {CriarJogadorDto} criarJogadorDto
	 */
	@Post()
	async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto): Promise<CriarJogadorDto> {
		return criarJogadorDto;
	}
}
