import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { CriarJogadorDto } from "./dtos/criarJogador.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { JogadoresService } from "./jogadores.service";
import { Jogador } from "./interfaces/jogador.interface";
import { AtualizarJogadorDto } from "./dtos/atualizarJogador.dto";
import { ValidacaoParametrosPipe } from "src/common/pipes/validacao.pipe";
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
	@ApiResponse({ status: 201, description: "The record is successfully update", type: AtualizarJogadorDto })
	async atualizarJogador(@Body() atualizarJogadorDto: AtualizarJogadorDto, @Param("_id", ValidacaoParametrosPipe) _id: string): Promise<AtualizarJogadorDto> {
		return await this.jogadoresService.updateJogador(_id, atualizarJogadorDto);
	}
	/**
	 *
	 *
	 * @return {*}  {Promise<Jogador[]>}
	 * @memberof JogadoresController
	 */
	@Get("/all")
	@ApiResponse({ status: 200, description: "Get all records", type: AtualizarJogadorDto })
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
	async getJogadoreByEmail(@Query("email", ValidacaoParametrosPipe) email: string): Promise<Jogador> {
		return this.jogadoresService.getJogadoreByEmail(email);
	}
	/**
	 *
	 * @param _id
	 * @returns {*}  {Promise<Jogador>}
	 */
	@Get("/:_id")
	async getJogadoreByID(@Param("_id", ValidacaoParametrosPipe) _id: string): Promise<Jogador> {
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
	async deleteJogador(@Query("email", ValidacaoParametrosPipe) email: string): Promise<any> {
		await this.jogadoresService.deleteJogador(email);
	}
}
