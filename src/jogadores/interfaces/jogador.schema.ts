// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import { Document } from "mongoose";
import * as mongoose from "mongoose";

export const JogadorSchema = new mongoose.Schema(
	{
		telefoneCelular: { type: String, required: true },
		email: { type: String, unique: true, required: true },
		nome: { type: String, required: true },
		ranking: String,
		posicaoRanking: Number,
		urlFotoJogador: String,
	},
	{ timestamps: true, collection: "jogadores" }
);
