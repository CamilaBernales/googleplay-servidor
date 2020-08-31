const express = require("express");
const router = express.Router();
const aplicacionController = require("../controllers/aplicacionController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const authrol = require("../middleware/authrol");
router.post(
  "/alta",
  auth,
  authrol,
  [
    check("nombre", "El nombre de la aplicacion es obligatorio.").notEmpty(),
    check(
      "detalle",
      "El de la aplicacion es obligatoria."
    ).notEmpty(),
    check("precio", "El precio de la aplicacion es obligatorio.").notEmpty(),
    check("imagen", "La imagen de la aplicacion es obligatoria.").notEmpty(),
    check("categoria", "La categoria de la aplicacion es obligatoria.").notEmpty(),
  ],
  aplicacionController.altaApp
);
router.put("/update/:id", auth, authrol, aplicacionController.updateApp);
router.get("/list", aplicacionController.listarApps);
router.get("/searchapp/:id", aplicacionController.obtenerApp);
router.get("/filtro", aplicacionController.ObtenerAppsFiltradas);
router.delete("/delete/:id",auth, authrol, aplicacionController.eliminarApp)
module.exports = router;
