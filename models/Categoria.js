const mongoose = require("mongoose");
const CategoriaSchema = mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
});
module.exports = mongoose.model("Categoria", CategoriaSchema);
