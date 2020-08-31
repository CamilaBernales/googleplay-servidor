const Aplicacion = require("../models/Aplicacion");

const { validationResult } = require("express-validator");

exports.altaApp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { nombre, detalle } = req.body;
  try {
    let aplicacion = await Aplicacion.findOne({ nombre, detalle });
    if (aplicacion) {
      return res
        .status(403)
        .json({ msg: "Esta aplicacion ya se encuentra registrado" });
    }
    aplicacion = new Aplicacion(req.body);
    await aplicacion.save();
    res.status(200).json({ msg: "Aplicacion cargada correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.updateApp = async (req, res) => {
  try {
    const aplicacion = await Aplicacion.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(aplicacion);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error." });
  }
};

exports.eliminarApp = async (req, res) => {
  try {
    let aplicacion = await Aplicacion.findById(req.params.id);
    if (!aplicacion) {
      res.status(404).json({ msg: "Aplicación no encontrado." });
    }
    //lo elimino
    await Aplicacion.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "Apliación eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
};

exports.listarApps = async (req, res) => {
  try {
    const { pagina } = req.query;
    const options = {
      page: pagina,
      limit: 10,
      sort: ({ creada: -1 })
    };
    const aplicaciones = await Aplicacion.paginate({}, options);
    res.status(200).json({ aplicaciones });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
};

exports.obtenerApp = async (req, res) => {
  try {
    const app = await Aplicacion.findById(req.params.id);
    res.status(200).json({ app });
  } catch (error) {
    res.status(500).send("Hubo un error");
  }
};

exports.ObtenerAppsFiltradas = async (req, res) => {
  try {
    const { nombre, categoria } = req.query;
    const appFiltradas = await Aplicacion.find({
      categoria,
      nombre: { $regex: ".*" + nombre + ".*", $options: "i" },
    }).sort({ creada: -1 });
    res.status(200).json(appFiltradas);
  } catch (error) {
    console.log(error);
  }
};
