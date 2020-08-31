const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-paginate-v2");

const Usuario = mongoose.Schema({
  nombre: {
    type: String,
    required: true

  },
  email: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
  }
});
const CompraSchema = mongoose.Schema({
  total: {
    type: Number,
    default:0
  },
  usuario: Usuario,
  pedido: {
    type: Array,
    required: true
  },
  fecha_compra:{
    type: Date,
    default: Date.now()
  }
});
CompraSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("Compra", CompraSchema);
