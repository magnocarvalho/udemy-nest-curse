import { Module } from "@nestjs/common";
import { JogadorSchema } from "./interfaces/jogador.schema";
import { JogadoresController } from "./jogadores.controller";
import { JogadoresService } from "./jogadores.service";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [MongooseModule.forFeature([{ name: "Jogador", schema: JogadorSchema }])],
	controllers: [JogadoresController],
	providers: [JogadoresService],
	exports: [JogadoresService],
})
export class JogadoresModule {}
