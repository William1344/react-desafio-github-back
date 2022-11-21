const { User, Repos } = require('../models');

const RepoController = {
  async index(req, res) {
    try {
      const { user_id } = req.params;
      const us = await User.findById(user_id);
      if (!us) return res.status(404).send({ msg: 'Usuário não encontrado' });
      else {
        const {query} = req.params;
        if(query) {
          const repo = await Repos.findOne({name: query});
          if(!repo) return res.status(404).send({ msg: 'Repositório não encontrado' });
          else return res.status(200).json(repo);
        }else{
          const repos = await Repos.find({ userId: user_id });
          return res.status(200).send(repos);
        }
      }
    } catch (e) {
      console.log("Error: " + e);
      return res.status(500).send({msg: "Erro ao buscar repositórios"});
    }
  },
  async create(req, res) {
    try {
      const { user_id }     = req.params;
      const { name, url }   = req.body;
      if (!name || !url) return res.status(400).send({ msg: 'Dados insuficientes' });
      // Verifica se o repositório já existe
      const repo = await Repos.findOne({url});
      if (repo) return res.status(400).send({ msg: 'Repositório já existe' });
      else {
        const newRepo = await Repos.create({
          userId: user_id,
          name:   name,
          url:    url,
        });
        return res.status(201).send({repo:newRepo}); // 201 = Objeto criado
      }
    } catch (e) {
      console.log("Error: " + e);
      return res.status(500).send({msg: "Erro ao criar repositório"});
    }
  },
  async destroy(req, res) {
    // Apagar repositório
    try {
      const { user_id, repo_id } = req.params;
      const us = await User.findById(user_id);
      if (!us) return res.status(404).send({ msg: 'Usuário não encontrado' });
      const repo = await Repos.findOne({
        _id     : repo_id,
        userId  : user_id
      });
      if (!repo) return res.status(404).send({ msg: 'Repositório não encontrado' });
      else {
        await Repos.deleteOne({
          _id     : repo_id,
          userId  : user_id
        });
        return res.status(200).send({ msg: 'Repositório apagado' });  
      }
    } catch (e) {
      console.log("Error: " + e);
      return res.status(500).send({msg: "Erro ao apagar repositório"});
    }
  }
}; module.exports = RepoController;