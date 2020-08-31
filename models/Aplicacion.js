const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-paginate-v2");
const AplicacionSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  detalle: {
    type: String,
    required: true,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
  creada:{
    type: Date,
    default: Date.now()
  },
  categoria:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
  }
});
AplicacionSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("Aplicaciones", AplicacionSchema);
