
import { Pessoa } from "../models/index.js";
import { criarService } from "../services/curriculoService.js";

const idValido = (id) => /^[1-9]\d*$/.test(String(id));

export const criarController = (Model, configuracao) => {
  const service = criarService(Model);
  const { campos, obrigatorios, listas = [] } = configuracao;

  const validarDados = (dados, criacao = false) => {
    for (const campo of obrigatorios) {
      if (criacao || Object.hasOwn(dados, campo)) {
        if (
          typeof dados[campo] !== "string" ||
          !dados[campo].trim()
        ) {
          return `${campo} deve ser informado`;
        }
      }
    }

    for (const campo of campos) {
      if (!Object.hasOwn(dados, campo)) continue;

      const valor = dados[campo];

      if (listas.includes(campo)) {
        if (
          !Array.isArray(valor) ||
          !valor.every(item => typeof item === "string")
        ) {
          return `${campo} deve ser uma lista de textos`;
        }
      } else if (
        valor !== null &&
        typeof valor !== "string"
      ) {
        return `${campo} deve ser um texto`;
      }
    }

    return null;
  };

  const selecionarDados = (body) => {
    const dados = {};

    for (const campo of [...campos, "pessoaId"]) {
      if (Object.hasOwn(body, campo)) {
        dados[campo] = body[campo];
      }
    }

    return dados;
  };

  const verificarPessoa = async (pessoaId) => {
    if (!Number.isSafeInteger(pessoaId) || pessoaId <= 0) {
      return { erro: "pessoaId inválido", status: 400 };
    }

    const pessoa = await Pessoa.findByPk(pessoaId);

    if (!pessoa) {
      return { erro: "Pessoa não encontrada", status: 404 };
    }

    return null;
  };

  return {
    listar: async (req, res) => {
      const filtro = req.query.pessoaId;

      if (filtro !== undefined && !idValido(filtro)) {
        return res.status(400).json({ erro: "pessoaId inválido" });
      }

      const registros = await service.listar(
        filtro === undefined ? undefined : Number(filtro)
      );

      return res.json(registros);
    },

    buscar: async (req, res) => {
      if (!idValido(req.params.id)) {
        return res.status(400).json({ erro: "ID inválido" });
      }

      const registro = await service.buscar(req.params.id);

      if (!registro) {
        return res.status(404).json({ erro: "Registro não encontrado" });
      }

      return res.json(registro);
    },

    criar: async (req, res) => {
      const dados = selecionarDados(req.body);
      const erro = validarDados(dados, true);

      if (erro) return res.status(400).json({ erro });

      const problema = await verificarPessoa(dados.pessoaId);

      if (problema) {
        return res.status(problema.status).json({
          erro: problema.erro
        });
      }

      const registro = await service.criar(dados);
      return res.status(201).json(registro);
    },

    atualizar: async (req, res) => {
      if (!idValido(req.params.id)) {
        return res.status(400).json({ erro: "ID inválido" });
      }

      const dados = selecionarDados(req.body);
      const erro = validarDados(dados);

      if (erro) return res.status(400).json({ erro });

      if (Object.keys(dados).length === 0) {
        return res.status(400).json({
          erro: "Informe os dados para atualização"
        });
      }

      if (Object.hasOwn(dados, "pessoaId")) {
        const problema = await verificarPessoa(dados.pessoaId);

        if (problema) {
          return res.status(problema.status).json({
            erro: problema.erro
          });
        }
      }

      const registro = await service.atualizar(req.params.id, dados);

      if (!registro) {
        return res.status(404).json({ erro: "Registro não encontrado" });
      }

      return res.json(registro);
    },

    excluir: async (req, res) => {
      if (!idValido(req.params.id)) {
        return res.status(400).json({ erro: "ID inválido" });
      }

      const excluido = await service.excluir(req.params.id);

      if (!excluido) {
        return res.status(404).json({ erro: "Registro não encontrado" });
      }

      return res.status(204).send();
    }
  };
};
