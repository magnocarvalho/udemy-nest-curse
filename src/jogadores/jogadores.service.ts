import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CriarJogadorDto } from "./dtos/criar-jogador.dto";
import { Jogador } from "./interfaces/jogador.interface";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class JogadoresService {
	private readonly logger = new Logger(JogadoresService.name);
	private jogadores: Jogador[] = [];
	async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
		this.logger.log(criarJogadorDto);
		const acharJogador = this.jogadores.find((jogador) => jogador.email === criarJogadorDto.email);
		if (acharJogador) {
			this.logger.log("Jogador ja existe");
			this.atualizarJogador(criarJogadorDto);
		} else await this.criarJogador(criarJogadorDto);
	}

	async getJogadores(): Promise<Jogador[]> {
		return this.jogadores;
	}

	async getJogadoreByEmail(email: string): Promise<Jogador> {
		const jogador = this.jogadores.find((jogador) => jogador.email === email);
		if (!jogador) throw new NotFoundException("Jogador não encontrado: " + email);
		return jogador;
	}

	async deleteJogador(email: string): Promise<void> {
		const index = this.jogadores.findIndex((j) => j.email === email);
		this.jogadores.splice(index, 1);
	}

	private async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
		this.jogadores.push({ ...criarJogadorDto, _id: uuidv4(), ranking: "A", posicaoRanking: "1", urlFotoJogador: "https://www.google.com/foto.png" });
	}

	private async atualizarJogador(jogador: CriarJogadorDto): Promise<void> {
		const index = this.jogadores.findIndex((j) => j.email === jogador.email);
		this.jogadores[index] = { ...this.jogadores[index], ...jogador };
	}
}
