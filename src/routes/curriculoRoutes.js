
import { Router } from "express";

import {
  Formacao,
  Experiencia,
  Projeto
} from "../models/index.js";

import { criarController } from "../controllers/curriculoController.js";

const criarRotas = (Model, configuracao) => {
  const router = Router();
  const controller = criarController(Model, configuracao);

  router.get("/", controller.listar);
  router.get("/:id", controller.buscar);
  router.post("/", controller.criar);
  router.put("/:id", controller.atualizar);
  router.delete("/:id", controller.excluir);

  return router;
};

export const formacaoRoutes = criarRotas(Formacao, {
  campos: ["curso", "instituicao", "status", "areas"],
  obrigatorios: ["curso", "instituicao"],
  listas: ["areas"]
});

export const experienciaRoutes = criarRotas(Experiencia, {
  campos: ["cargo", "descricao", "tecnologias"],
  obrigatorios: ["cargo"],
  listas: ["tecnologias"]
});

export const projetoRoutes = criarRotas(Projeto, {
  campos: ["nome", "descricao", "status", "tecnologias"],
  obrigatorios: ["nome"],
  listas: ["tecnologias"]
});
