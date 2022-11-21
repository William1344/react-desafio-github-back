/*
  Filtra as requisições e verifica se o usuário está logado através do token
  Middleware de autenticação
    HTTP -> Protocolo de comunicação TCP (orientado a conexão)
      Headers -> Informações sobre a requisição
        "token -> Token de autenticação do usuário" O token é enviado pelo header da requisição
      Body -> Informações enviadas pelo cliente

*/
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const { promisify } = require('util');

async function Auth (req, res, next) {
  console.log("Auth", req.headers);
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({ error: 'Você não esta logado' });
  // Desestruturação do array string
  const token = authHeader.split(' ').pop();
  console.log("Token: " + token);
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    console.log("Error: " + err + "Token inválido");
    return res.status(401).send({ error: 'Token inválido' });
  }
} ; module.exports = Auth;