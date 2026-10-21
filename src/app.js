
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    mensagem: "API do Portfólio funcionando!"
  });
});

export default app;
