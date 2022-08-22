import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CriaCategoriaDto } from "./dto/criaCategoria.dto";
import { Categoria } from "./interfaces/categoria.interface";

@Injectable()
export class CategoriasService {
	constructor(@InjectModel("Categoria") private readonly categoriaModel: Model<Categoria>) {}

	async newCategoria(categoria: CriaCategoriaDto): Promise<Categoria> {
		const categoriaEncontrado = await this.categoriaModel.findOne({ categoria: categoria.categoria }).exec();
		// return categoriaModel.;
		if (categoriaEncontrado) {
			throw new BadRequestException("Categoria já cadastrada");
		}

		const categoriaNew = new this.categoriaModel(categoria);

		return await categoriaNew.save();
	}
}
