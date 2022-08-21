import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { CriarJogadorDto } from "./dtos/criar-jogador.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { JogadoresService } from "./jogadores.service";
import { Jogador } from "./interfaces/jogador.interface";
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
	constructor(private readonly jogadoresService: JogadoresService) {}

	/**
	 * Metodo responsavel pela criação de jogador na api
	 *
	 * @param {CriarJogadorDto} criarJogadorDto
	 * @memberof JogadoresController
	 * @author Magneira
	 * @argument {CriarJogadorDto} criarJogadorDto
	 * @return {Promise<CriarJogadorDto>}
	 */
	@Post()
	@ApiResponse({ status: 201, description: "The record is successfully created", type: CriarJogadorDto })
	@ApiResponse({ status: 403, description: "Forbidden" })
	async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto): Promise<CriarJogadorDto> {
		await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
		return criarJogadorDto;
	}

	@Get("/all")
	// @ApiResponse({ description: "Get all jogadores", type: Promise<Jogador[]> })
	async getAllJogadores(): Promise<Jogador[]> {
		return this.jogadoresService.getJogadores();
	}

	@Get()
	// @ApiResponse({ description: "Get all jogadores", type: Promise<Jogador | Jogador[]> })
	async getJogadoreByEmail(@Query("email") email: string): Promise<Jogador | Jogador[]> {
		if (email) return this.jogadoresService.getJogadoreByEmail(email);
		else return this.jogadoresService.getJogadores();
	}

	@Delete()
	async deleteJogador(@Query("email") email: string): Promise<void> {
		await this.jogadoresService.deleteJogador(email);
	}
}
