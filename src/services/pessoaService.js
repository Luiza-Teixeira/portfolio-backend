
import {
  Pessoa,
  Formacao,
  Experiencia,
  Projeto
} from "../models/index.js";

export const listarPessoas = async () => {
  return await Pessoa.findAll();
};

export const buscarPessoa = async (id) => {
  return await Pessoa.findByPk(id);
};

export const criarPessoa = async (dados) => {
  return await Pessoa.create(dados);
};

export const atualizarPessoa = async (id, dados) => {
  const pessoa = await Pessoa.findByPk(id);

  if (!pessoa) return null;

  await pessoa.update(dados);
  return pessoa;
};

export const excluirPessoa = async (id) => {
  const pessoa = await Pessoa.findByPk(id);

  if (!pessoa) return false;

  await pessoa.destroy();
  return true;
};


export const buscarCurriculo = async (id) => {
  return await Pessoa.findByPk(id, {
    include: [
      {
        model: Formacao,
        as: "formacoes"
      },
      {
        model: Experiencia,
        as: "experiencias"
      },
      {
        model: Projeto,
        as: "projetos"
      }
    ]
  });
};

