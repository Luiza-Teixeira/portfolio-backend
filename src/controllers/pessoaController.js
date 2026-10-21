
import * as service from "../services/pessoaService.js";

const dadosValidos = (dados) =>
  typeof dados.nome === "string" &&
  dados.nome.trim() !== "" &&
  typeof dados.titulo === "string" &&
  dados.titulo.trim() !== "";

const idValido = (id) => /^[1-9]\d*$/.test(id);

export const listar = async (req, res) => {
  const pessoas = await service.listarPessoas();
  return res.json(pessoas);
};

export const buscar = async (req, res) => {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const pessoa = await service.buscarPessoa(req.params.id);

  if (!pessoa) {
    return res.status(404).json({ erro: "Pessoa não encontrada" });
  }

  return res.json(pessoa);
};

export const criar = async (req, res) => {
  if (!dadosValidos(req.body)) {
    return res.status(400).json({
      erro: "Nome e título são obrigatórios"
    });
  }

  const pessoa = await service.criarPessoa({
    nome: req.body.nome,
    titulo: req.body.titulo,
    resumo: req.body.resumo
  });

  return res.status(201).json(pessoa);
};

export const atualizar = async (req, res) => {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const atualizacoes = {};
  for (const campo of ["nome", "titulo", "resumo"]) {
    if (Object.hasOwn(req.body, campo)) {
      atualizacoes[campo] = req.body[campo];
    }
  }

  if (!dadosValidos({
    nome: atualizacoes.nome,
    titulo: atualizacoes.titulo
  })) {
    
    return res.status(400).json({
      erro: "Informe nome e título válidos"
    });
  }

  const pessoa = await service.atualizarPessoa(
    req.params.id,
    atualizacoes
  );

  if (!pessoa) {
    return res.status(404).json({ erro: "Pessoa não encontrada" });
  }

  return res.json(pessoa);
};

export const excluir = async (req, res) => {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const excluida = await service.excluirPessoa(req.params.id);

  if (!excluida) {
    return res.status(404).json({ erro: "Pessoa não encontrada" });
  }

  return res.status(204).send();
};
