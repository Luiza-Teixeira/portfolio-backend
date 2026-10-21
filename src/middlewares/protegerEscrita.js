
import { timingSafeEqual } from "node:crypto";

const protegerEscrita = (req, res, next) => {
  if (req.method === "GET" || req.method === "HEAD") {
    return next();
  }

  const chaveConfigurada = process.env.ADMIN_API_KEY;
  const chaveRecebida = req.headers["x-admin-key"];

  if (!chaveConfigurada) {
    return res.status(503).json({
      erro: "Serviço administrativo indisponível"
    });
  }

  if (typeof chaveRecebida !== "string") {
    return res.status(401).json({
      erro: "Chave administrativa necessária"
    });
  }

  const esperada = Buffer.from(chaveConfigurada);
  const recebida = Buffer.from(chaveRecebida);

  if (
    esperada.length !== recebida.length ||
    !timingSafeEqual(esperada, recebida)
  ) {
    return res.status(401).json({
      erro: "Chave administrativa inválida"
    });
  }

  next();
};

export default protegerEscrita;
