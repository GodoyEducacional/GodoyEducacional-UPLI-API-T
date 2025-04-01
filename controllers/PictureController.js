// Importa o models Picture para interagir com o DB
const Picture = require("../models/Picture");

// Importa o módulo fs para interagir com o sistema de arquivos
const fs = require("fs");

// Função para criar uma nova imagem no banco de dados
exports.create = async (req, res) => {
  try {
    // Obtém o nome da img do corpo da requisição
    const { name } = req.body;

    // Obtém o arquivo da req. (Usado pelo Multer para fazer o Upload)
    const file = req.file;

    // Cria uma nova instância com nome e caminho do arquivo
    const picture = new Picture({
      name,
      src: file.path,
    });

    // Salva a imagem no DB
    await picture.save();

    // Retorna a resposta com a img. e uma msg. de sucesso
    res.json({ picture, msg: "Imagem salva com sucesso!" });
  } catch (err) {
    // Em caso de erro, retorna uma msg. com erro 500
    res.status(500).json({ message: "Erro ao salvar imagem!" });
  }
};

// Função para encontrar todas as imagens no banco de dados
exports.findAll = async (req, res) => {
  try {
    // Busca todas as imagens no banco de dados
    const pictures = await Picture.find();

    // Retorna todas as imagens do DB
    res.json({ pictures, msg: "Imagens buscadas com sucesso!" });
  } catch (err) {
    // Em caso de erro, retorna uma resposta de erro com código 500
    res.status(500).json({ message: "Erro ao buscar imagens!" });
  }
};

// Função para remover uma imagem do DB e local
exports.remove = async (req, res) => {
  try {
    // Busca a imagem no DB, com a ID enviada
    const picture = await Picture.findById(req.params.id);

    // Se a img. não for encontrada no DB
    if (!picture) {
      return res.status(404).json({ message: "Imagem não encontrada!" });
    }

    // Remove o arquivo localmente (Uploads)
    fs.unlinkSync(picture.src);

    // Remove o a imagem do DB
    await Picture.deleteOne({ _id: req.params.id });

    // Retorna uma resposta ao Usuario
    res.json({ message: "Imagem removida com sucesso!" });
  } catch (error) {
    // Retorna erro se houver algum problema
    res.status(500).json({ message: "Erro ao excluir imagem!" });
  }
};
