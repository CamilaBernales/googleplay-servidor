const express = require("express");
const conectarDB = require("./db");
const morgan = require("morgan");
const cors = require("cors");


const app  = express()
// puerto
const port = process.env.PORT || 4000
// conectar db
app.use(cors())
conectarDB()
// middlewares
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/usuario", require("./routes/usuario"));
app.use("/api/app", require("./routes/aplicacion"));
app.use("/api/compra", require("./routes/compra"));
app.use("/api/categoria", require("./routes/categoria"));


app.listen(port, "0.0.0.0", () => {
    //arrancar servidor
    console.log(`Servidor Funcionando en puerto ${port}`);
  });
  