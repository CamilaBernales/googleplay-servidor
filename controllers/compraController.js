const Compra = require("../models/Compra");

exports.crearCompra = async (req, res) => {
  const { usuario, pedido, total, fecha_compra } = req.body;
  try {
    const compraNueva = {
      usuario,
      pedido,
      total,
      fecha_compra,
    };
    let compra = new Compra(compraNueva);
    await compra.save();
    return res.status(202).json({ msg: "Compra realizada con exito." });
  } catch (error) {
    console.log(error);
  }
};
