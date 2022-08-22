import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CriarJogadorDto } from "./dtos/criarJogador.dto";
import { Jogador } from "./interfaces/jogador.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AtualizarJogadorDto } from "./dtos/atualizarJogador.dto";

@Injectable()
export class JogadoresService {
	private readonly logger = new Logger(JogadoresService.name);

	constructor(@InjectModel("Jogador") private readonly jogadorModel: Model<Jogador>) {}

	async getJogadores(): Promise<Jogador[]> {
		// return this.jogadores;
		return await this.jogadorModel.find().exec();
	}

	async getJogadoreByEmail(email: string): Promise<Jogador> {
		const jogador = await this.jogadorModel.findOne({ email }).exec();
		if (!jogador) throw new NotFoundException("Jogador não encontrado: " + email);
		return jogador;
	}

	async getJogadorByID(_id: string): Promise<Jogador> {
		const jogador = await this.jogadorModel.findOne({ _id }).exec();
		if (!jogador) throw new NotFoundException("Jogador não encontrado: " + _id);
		return jogador;
	}

	async deleteJogador(email: string): Promise<any> {
		// const index = this.jogadores.findIndex((j) => j.email === email);
		// this.jogadores.splice(index, 1);
		await this.jogadorModel.findOneAndDelete({ email: email });
	}

	async newJogador(jogador: CriarJogadorDto): Promise<Jogador> {
		// this.jogadores.push({ ...criarJogadorDto, _id: uuidv4(), ranking: "A", posicaoRanking: 1, urlFotoJogador: "https://www.google.com/foto.png" });
		const acharJogador = await this.jogadorModel.findOne({ email: jogador.email }).exec();
		if (acharJogador) {
			throw new BadRequestException("Jogador ja existe");
		}
		const jogadorNew = new this.jogadorModel(jogador);

		return await jogadorNew.save();
	}

	async updateJogador(_id: string, jogador: AtualizarJogadorDto): Promise<Jogador> {
		// const index = this.jogadores.findIndex((j) => j.email === jogador.email);
		// this.jogadores[index] = { ...this.jogadores[index], ...jogador };
		return await this.jogadorModel.findByIdAndUpdate(_id, { ...jogador });
	}

	async updateJogadorEmail(email: string, jogador: CriarJogadorDto): Promise<Jogador> {
		// const index = this.jogadores.findIndex((j) => j.email === jogador.email);
		// this.jogadores[index] = { ...this.jogadores[index], ...jogador };
		return await this.jogadorModel.findOneAndUpdate({ email: email }, { ...jogador });
	}
}
