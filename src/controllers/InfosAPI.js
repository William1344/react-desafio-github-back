async function InfosAPI(req, res) {
  console.log("InfosAPI, chamou!");
  res.send({msg: "API criada por Willian1344\n Versão: 1.0.0 \n"+ 
    "Gerenciador de logins e usuários, desafio repositório GitHub\n"});

  } ; module.exports = InfosAPI;