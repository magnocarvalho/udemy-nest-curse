import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { JogadoresModule } from "./jogadores/jogadores.module";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoriasModule } from './categorias/categorias.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}),
		JogadoresModule,
		CategoriasModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
