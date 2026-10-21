
export const criarService = (Model) => ({
  listar: async (pessoaId) => {
    const filtro = pessoaId ? { pessoaId } : {};
    return Model.findAll({ where: filtro });
  },

  buscar: async (id) => {
    return Model.findByPk(id);
  },

  criar: async (dados) => {
    return Model.create(dados);
  },

  atualizar: async (id, dados) => {
    const registro = await Model.findByPk(id);

    if (!registro) return null;

    await registro.update(dados);
    return registro;
  },

  excluir: async (id) => {
    const registro = await Model.findByPk(id);

    if (!registro) return false;

    await registro.destroy();
    return true;
  }
});
