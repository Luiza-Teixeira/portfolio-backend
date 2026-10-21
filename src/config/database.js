
import "dotenv/config";
import { Sequelize } from "sequelize";
import pg from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não configurada.");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
  logging: false
});

export default sequelize;
