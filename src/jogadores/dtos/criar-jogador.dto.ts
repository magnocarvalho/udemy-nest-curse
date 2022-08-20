import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty, MinLength, Matches, IsMobilePhone } from "class-validator";
/**
 * DTO class to create a new player.
 */
export class CriarJogadorDto {
	@ApiProperty({
		description: "Has to match a regular expression: /^\\+[1-9]\\d{1,14}$/",
		example: "+123123123123",
	})
	@IsString()
	@IsNotEmpty()
	@Matches(/^\+[1-9]\d{1,14}$/)
	@IsMobilePhone("pt-BR")
	readonly telefoneCelular: string;
	@IsEmail()
	readonly email: string;
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	readonly nome: string;
}
