import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JogadoresService } from "src/jogadores/jogadores.service";
import { AtualizarCategoriaDto } from "./dto/atualizarCategoria.dto";
import { CriaCategoriaDto } from "./dto/criaCategoria.dto";
import { Categoria } from "./interfaces/categoria.interface";

@Injectable()
export class CategoriasService {
	constructor(@InjectModel("Categoria") private readonly categoriaModel: Model<Categoria>, private readonly jogadoresService: JogadoresService) {}

	async newCategoria(categoria: CriaCategoriaDto): Promise<Categoria> {
		const categoriaEncontrado = await this.categoriaModel.findOne({ categoria: categoria.categoria }).exec();
		// return categoriaModel.;
		if (categoriaEncontrado) {
			throw new BadRequestException("Categoria já cadastrada");
		}

		const categoriaNew = new this.categoriaModel(categoria);

		return await categoriaNew.save();
	}

	async getCategorias(): Promise<Categoria[]> {
		return await this.categoriaModel.find().exec();
	}

	async getByIdCategoria(_id: string): Promise<Categoria> {
		const categoriaEncontrado = await this.categoriaModel.findById(_id).exec();
		if (!categoriaEncontrado) {
			throw new NotFoundException("Categoria não encontrada");
		}
		return categoriaEncontrado;
	}

	async getByCategoria(categoria: string): Promise<Categoria> {
		const categoriaEncontrado = await this.categoriaModel.findOne({ categoria: categoria }).exec();
		if (!categoriaEncontrado) {
			throw new NotFoundException("Categoria não encontrada");
		}
		return categoriaEncontrado;
	}

	async updateCategoria(categoria: string, categoriaDto: AtualizarCategoriaDto): Promise<Categoria> {
		const categoriaEncontrado = await this.categoriaModel.findOne({ categoria: categoria }).exec();
		if (!categoriaEncontrado) {
			throw new NotFoundException("Categoria não encontrada");
		}
		return await this.categoriaModel.findOneAndUpdate({ categoria: categoria }, categoriaDto).exec();
	}

	async atribuirCategoriaJogador(params: string[]): Promise<void> {
		const categoria = params["categoria"];
		const idJogador = params["idJogador"];

		const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
		const jogadorJaCadastradoCategoria = await this.categoriaModel.find({ categoria }).where("jogadores").in(idJogador).exec();

		await this.jogadoresService.getJogadorByID(idJogador);

		if (!categoriaEncontrada) {
			throw new BadRequestException(`Categoria ${categoria} não cadastrada!`);
		}

		if (jogadorJaCadastradoCategoria.length > 0) {
			throw new BadRequestException(`Jogador ${idJogador} já cadastrado na Categoria ${categoria}!`);
		}

		categoriaEncontrada.jogadores.push(idJogador);
		await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: categoriaEncontrada }).exec();
	}
}
