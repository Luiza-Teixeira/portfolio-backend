
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Pessoa = sequelize.define("Pessoa", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  resumo: {
    type: DataTypes.TEXT
  }
}, {
  tableName: "pessoas",
  timestamps: false
});

const Formacao = sequelize.define("Formacao", {
  curso: {
    type: DataTypes.STRING,
    allowNull: false
  },
  instituicao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING
  },
  areas: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  }
}, {
  tableName: "formacoes",
  timestamps: false
});

const Experiencia = sequelize.define("Experiencia", {
  cargo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT
  },
  tecnologias: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  }
}, {
  tableName: "experiencias",
  timestamps: false
});

const Projeto = sequelize.define("Projeto", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.STRING
  },
  tecnologias: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  }
}, {
  tableName: "projetos",
  timestamps: false
});

const entidades = [
  { model: Formacao, alias: "formacoes" },
  { model: Experiencia, alias: "experiencias" },
  { model: Projeto, alias: "projetos" }
];

for (const entidade of entidades) {
  Pessoa.hasMany(entidade.model, {
    as: entidade.alias,
    foreignKey: {
      name: "pessoaId",
      allowNull: false
    },
    onDelete: "CASCADE"
  });

  entidade.model.belongsTo(Pessoa, {
    as: "pessoa",
    foreignKey: "pessoaId"
  });
}

export { Pessoa, Formacao, Experiencia, Projeto };
