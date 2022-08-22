import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class JogadoresValidacaoPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		console.info(value, metadata);

		if (!value) {
			throw new BadRequestException("O campo não pode ser vazio: " + metadata.data);
		}

		return value;
	}
}