import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CategoriasService } from "./categorias.service";
import { AtualizarCategoriaDto } from "./dto/atualizarCategoria.dto";
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
	/**
	 *
	 * @param categoria Nome da categoria a ser deletada
	 * @param categoriaDto
	 * @returns Categoria
	 */
	@Put("/:categoria")
	@UsePipes(ValidationPipe)
	async updateByCategoriaName(@Param("categoria") categoria: string, @Body() categoriaDto: AtualizarCategoriaDto): Promise<Categoria> {
		return await this.categoriaService.updateCategoria(categoria, categoriaDto);
	}

	@Get()
	async getCategorias(): Promise<Categoria[]> {
		return this.categoriaService.getCategorias();
	}

	@Get("/id/:_id/")
	async getByIdCategoria(@Param("_id") _id: string): Promise<Categoria> {
		return await this.categoriaService.getByIdCategoria(_id);
	}

	@Get("/:categoria")
	async getByCategoriaName(@Param("categoria") categoria: string): Promise<Categoria> {
		return await this.categoriaService.getByCategoria(categoria);
	}

	@Post("/:categoria/jogadores/:idJogador")
	async atribuirCategoriaJogador(@Param() params: string[]): Promise<void> {
		return await this.categoriaService.atribuirCategoriaJogador(params);
	}
}
