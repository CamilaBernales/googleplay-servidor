const express = require("express");
const router = express.Router();
const compraController = require("../controllers/compraController");
const auth = require("../middleware/auth");
//crear usuario
router.post(
  "/alta",auth,
  compraController.crearCompra
);

module.exports = router;
