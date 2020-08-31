const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");
const auth = require("../middleware/auth");
const authrol = require("../middleware/authrol");
router.post("/alta", auth, authrol, categoriaController.crearCategoria);
router.get("/list", categoriaController.listarCategorias);
router.delete("/delete/:id", auth, authrol, categoriaController.eliminarCategoria)
router.put("/update/:id", auth, authrol, categoriaController.updateCategoria)
router.get("/search/:id", auth, authrol, categoriaController.obtenerUnaCategoria);

module.exports = router;
