const {User} = require('../models');
const { hashPassword } = require('../services');

const UserController = {
  async index(req, res) {
    try{
      const users = await User.find();
      return res.send(users);
    } catch (e) {
      console.log("Error: " + e);
      return res.status(500).send({error: "Erro ao buscar usuários"});
    }
  },
  async show(req, res) {
    try{
      const {id} = req.params;
      const us = await User.findById(id);
      if(!us) return res.status(404).send({error: "Usuário não encontrado"});
      else return res.send(us);
    } catch (e) {
      console.log("Error: " + e);
      return res.status(500).send({error: "Erro ao buscar usuário"});
    }
  },
  async create(req, res) {
    try{
      const {email, password} = req.body; // Método post pois estamos criando um novo usuário, precisamos proteger a senha
      const us = await User.findOne({email});
      if(us) return res.status(422).send({error: "Usuário já registrado"});
      else{
        // Criptografar a senha
        const passCrypt = await hashPassword(password);
        //console.log("Senha criptografada: " + passCrypt);
        const newUser = await User.create({
          email, 
          password: passCrypt
        });
        return res.status(201).send(newUser); // 201 = No protocolo http significa que o objeto foi criado com sucesso!
      }
    } catch (e) {
      console.log("Error: " + e);
      return res.status(500).send({error: "Erro ao buscar usuários"});
    }
  },
  async update(req, res) {
    try{
      const {id} = req.params;
      const {email, password} = req.body;
      if(!email || !password) return res.status(400).send({error: "Dados insuficientes"});
      const us = await User.findById(id);
      if(!us) return res.status(404).send({error: "Usuário não encontrado"});
      else{
        const passCrypt = await hashPassword(password);
        await us.updateOne({
          email,
          password: passCrypt
        });
        await us.save();
        
        const newUs = await User.findById(id); // Buscando o usuário atualizado

        return res.status(200).send({message: "Usuário atualizado com sucesso!", newUser: newUs});
      }
    } catch (e) {
      console.log("Error: " + e);
      return res.status(500).send({error: "Erro ao atualizar usuário"});
    }
  },
  async destroy(req, res) {
    // Deletar um usuário
    try{
      const {id} = req.params;
      const us = await User.findById(id);
      if(!us) return res.status(404).send({error: "Usuário não encontrado"});
      else{
        await us.deleteOne();
        return res.status(200).send({message: "Usuário deletado com sucesso!"});
      }
    } catch (e) {
      console.log("Error: " + e);
      return res.status(500).send({error: "Erro ao deletar usuário"});
    }
  }
} ; module.exports = UserController;