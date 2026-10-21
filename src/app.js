
import express from "express";
import cors from "cors";
import pessoaRoutes from "./routes/pessoaRoutes.js";
import {
  formacaoRoutes,
  experienciaRoutes,
  projetoRoutes
} from "./routes/curriculoRoutes.js";
import protegerEscrita from "./middlewares/protegerEscrita.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    mensagem: "API do Portfólio funcionando!"
  });
});

app.use(protegerEscrita);
app.use("/pessoas", pessoaRoutes);
app.use("/formacoes", formacaoRoutes);
app.use("/experiencias", experienciaRoutes);
app.use("/projetos", projetoRoutes);

app.use((erro, req, res, next) => {
  console.error("Erro interno:", erro);
  return res.status(500).json({
    erro: "Erro interno do servidor"
  });
});

export default app;
