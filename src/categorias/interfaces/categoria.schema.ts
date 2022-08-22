import * as mongoose from "mongoose";

export const CategoriaSchema = new mongoose.Schema(
	{
		categoria: { type: String, required: true, unique: true },
		descricao: { type: String, required: true },
		eventos: [
			{
				nome: { type: String, required: true },
				operacao: { type: String, required: true },
				valor: { type: Number, required: true },
			},
		],
		jogadores: [{ type: mongoose.Schema.Types.ObjectId, ref: "Jogador" }],
	},
	{ timestamps: true, collection: "categorias" }
);
