const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Crear Usuario
exports.crearUsuario = async (req, res) => {
  // Extraer email y password
  const { email, password } = req.body;
  try {
    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
      return res.status(403).json({ msg: "Ingrese un email válido." });
    }
    if (password.length < 6) {
      return res
        .status(403)
        .json({ msg: "La contraseña debe ser de más de seis carácteres." });
    }
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res
        .status(400)
        .json({ msg: "El email ingresado ya esta siendo usado." });
    }
    // Creamos el usuario
    usuario = new Usuario(req.body);
    // Hashear password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);
    // Guardamos el usuario en la BD
    await usuario.save();
    //payload
    const payload = {
      usuario: {
        id: usuario.id,
        rol: usuario.rol,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: "365d",
      },
      (error, token) => {
        if (error) throw error;
        res.json({ msg: "Usuario creado correctamente", token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
