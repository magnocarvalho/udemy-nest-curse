import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, Matches, IsMobilePhone } from "class-validator";
/**
 * DTO class to create a new player.
 */
export class AtualizarJogadorDto {
	@ApiProperty({
		description: "Has to match a regular expression: /^\\+[1-9]\\d{1,14}$/",
		example: "+5511912345678",
	})
	@IsString()
	@IsNotEmpty()
	@Matches(/^\+[1-9]\d{1,14}$/)
	@IsMobilePhone("pt-BR")
	readonly telefoneCelular: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@ApiProperty({ description: "Has to be at least 3 characters long", example: "John" })
	readonly nome: string;
}
