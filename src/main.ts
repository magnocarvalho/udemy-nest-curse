import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/filters/http-exception.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder().setTitle("Magneira API").setDescription("The UDEMY CURSE API description").setVersion("1.0").build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("docs", app, document);
	app.useGlobalFilters(new AllExceptionsFilter());
	await app.listen(process.env.PORT || 3000);
}
bootstrap();
