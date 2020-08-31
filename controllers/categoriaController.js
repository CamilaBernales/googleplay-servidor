const Categoria = require("../models/Categoria");
const Aplicacion = require("../models/Aplicacion");

exports.crearCategoria = async (req, res) => {
  const { titulo } = req.body;
  try {
    let categoria_existent = await Aplicacion.findOne({ titulo });
    if (categoria_existent) {
      return res
        .status(403)
        .json({ msg: "Esta categoria ya se encuentra registrada" });
    }
    let categoria = new Categoria(req.body);
    await categoria.save();
    return res.status(202).json({ msg: "categoria creada con exito." });
  } catch (error) {
    console.log(error);
  }
};
exports.listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find({});
    res.status(200).json({ categorias });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
};
exports.eliminarCategoria = async (req, res) => {
  try {
    let app = await Aplicacion.find({ categoria: req.params.id });
    if (app.length === 0) {
      await Categoria.findByIdAndRemove({ _id: req.params.id });
      return res
        .status(200)
        .json({ msg: "Categoria eliminada correctamente." });
    } else {
      return res
        .status(403)
        .json({
          msg:
            "Esta categoria tiene aplicaciones asociadas. No puedes eliminarla",
        });
    }
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
};
exports.updateCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
};

exports.obtenerUnaCategoria = async (req, res) => {
    try {
      const categoria = await Categoria.findById(req.params.id);
      res.status(200).json({ categoria });
    } catch (error) {
      res.status(500).send("Hubo un error");
    }
  };
  