
import express from "express";
import cors from "cors";
import pessoaRoutes from "./routes/pessoaRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    mensagem: "API do Portfólio funcionando!"
  });
});

app.use("/pessoas", pessoaRoutes);

app.use((erro, req, res, next) => {
  console.error("Erro interno:", erro);
  return res.status(500).json({
    erro: "Erro interno do servidor"
  });
});

export default app;
