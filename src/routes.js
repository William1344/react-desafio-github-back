const express       = require('express');
const routes        = express.Router();
const auth          = require('./middlewares/auth');

const {
  InfosAPI, UserControll, RepoControll, SessionControll
} = require('./controllers');

const rotas = {
  initial   :   '/',
  users     :   '/users',
  usersId   :   '/users/:id',
  repos     :   '/users/:user_id/repos/:query?',
  reposId   :   '/users/:user_id/repos/:repo_id',
  session   :   '/session'
}
// Rotas públicas
routes.get(rotas.initial,     InfosAPI);              // Rota inicial para API
routes.post(rotas.session,    SessionControll.create); // Rota para validar login e criar sessão
routes.post(rotas.users,      UserControll.create);   // Rota para criar um usuário
// Middleware de autenticação!
routes.use(auth);

// -- Rotas protegidas
// RESTFull API
// Rotas para usuários
routes.get(rotas.users,       UserControll.index);    // Rota para listar todos os usuários
routes.get(rotas.usersId,     UserControll.show);     // Rota para listar um usuário
routes.put(rotas.usersId,     UserControll.update);   // Rota para atualizar um usuário
routes.delete(rotas.usersId,  UserControll.destroy);  // Rota para deletar um usuário
// Rotas para repositórios
routes.get(rotas.repos,       RepoControll.index);    // Rota para listar todos os repositórios de um usuário
routes.post(rotas.repos,      RepoControll.create);   // Rota para criar um repositório para um usuário
routes.delete(rotas.reposId,  RepoControll.destroy);  // Rota para apagar um repositório de um usuário

module.exports = routes;