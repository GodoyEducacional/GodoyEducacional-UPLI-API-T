// Importa para interagir com o DB
const mongoose = require("mongoose");

// Carrega variáveis de ambiente do arquivo .ENV
require("dotenv").config();

// Configurando para permitir consultas (Restritas)
mongoose.set("strictQuery", true);

// Função para no DB
async function main() {
  await mongoose
    .connect
    // Link do Mongo
    ();
  // Exibe ao usuario que realizou a conexão
  console.log("Conectou ao banco de dados!");
}
// Exibe a msg ao usuário com erro
main().catch((err) => console.log(err));

// Exporta a função para utilizar em outro arquivo
module.exports = main;
