const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { checkPassword } = require('../services/auth');
const authConfig = require('../config/auth');

const SessionControll = {
  async create(req, res) {
    const { email, password } = req.body;
    const us = await User.findOne({ email });
    if (!us) return res.status(400).json({ error: 'Email ou senha incorretos' });
    else if(!await checkPassword(us, password)) return res.status(400).json({ error: 'Email ou Senha incorretos' });
    else {
      return res.status(200).json({
        user : {
          id: us.id,
          email: us.email,
        },
        token: jwt.sign({ id: us.id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      })
    }
  }
} ; module.exports = SessionControll;