import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { CriarJogadorDto } from "./dtos/criar-jogador.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { JogadoresService } from "./jogadores.service";
import { Jogador } from "./interfaces/jogador.interface";
import { JogadoresValidacaoPipe } from "./pipes/jogadoresValidacao.pipe";
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
	 * @return {*} {Promise<CriarJogadorDto>}
	 */
	@Post()
	@UsePipes(ValidationPipe)
	@ApiResponse({ status: 201, description: "The record is successfully created", type: CriarJogadorDto })
	async criarJogador(@Body() criarJogadorDto: CriarJogadorDto): Promise<CriarJogadorDto> {
		return await this.jogadoresService.newJogador(criarJogadorDto);
	}

	@Put("/:_id")
	@UsePipes(ValidationPipe)
	@ApiResponse({ status: 201, description: "The record is successfully created", type: CriarJogadorDto })
	async atualizarJogador(@Body() criarJogadorDto: CriarJogadorDto, @Param("_id", JogadoresValidacaoPipe) _id: string): Promise<CriarJogadorDto> {
		return await this.jogadoresService.updateJogador(_id, criarJogadorDto);
	}
	/**
	 *
	 *
	 * @return {*}  {Promise<Jogador[]>}
	 * @memberof JogadoresController
	 */
	@Get("/all")
	async getAllJogadores(): Promise<Jogador[]> {
		return this.jogadoresService.getJogadores();
	}
	/**
	 *
	 *
	 * @param {string} email
	 * @return {*}  {Promise<Jogador>}
	 * @memberof JogadoresController
	 */
	@Get()
	async getJogadoreByEmail(@Query("email", JogadoresValidacaoPipe) email: string): Promise<Jogador> {
		return this.jogadoresService.getJogadoreByEmail(email);
	}
	/**
	 *
	 * @param _id
	 * @returns {*}  {Promise<Jogador>}
	 */
	@Get("/:_id")
	async getJogadoreByID(@Param("_id", JogadoresValidacaoPipe) _id: string): Promise<Jogador> {
		return this.jogadoresService.getJogadorByID(_id);
	}
	/**
	 *
	 *
	 * @param {string} email
	 * @return {*}  {Promise<void>}
	 * @memberof JogadoresController
	 */
	@Delete()
	async deleteJogador(@Query("email", JogadoresValidacaoPipe) email: string): Promise<any> {
		await this.jogadoresService.deleteJogador(email);
	}
}
