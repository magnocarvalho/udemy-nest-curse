import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CategoriasService } from "./categorias.service";
import { CriaCategoriaDto } from "./dto/criaCategoria.dto";
import { Categoria } from "./interfaces/categoria.interface";
@Controller("categorias")
@ApiTags("Categorias")
export class CategoriasController {
	constructor(private readonly categoriaService: CategoriasService) {}

	@Post()
	@UsePipes(ValidationPipe)
	async criaCategoria(@Body() categoria: CriaCategoriaDto): Promise<Categoria> {
		return this.categoriaService.newCategoria(categoria);
	}
}
