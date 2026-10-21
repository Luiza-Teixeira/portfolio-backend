
import { Router } from "express";
import * as controller from "../controllers/pessoaController.js";

const router = Router();

router.get("/", controller.listar);
router.get("/:id", controller.buscar);
router.post("/", controller.criar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.excluir);

export default router;
