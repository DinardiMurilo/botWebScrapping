const express = require("express");
const iniciarBot = require("./bot/bot"); // 👈 TEM que ser este caminho

const app = express();

app.use(express.static("frontend"));

app.get("/iniciar", (req, res) => {
  const keyword = req.query.keyword;
  iniciarBot(keyword);
  res.send("Bot iniciado");
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
