const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var bcrypt = require("bcryptjs");

const app = express();
//configuracion de cors para peticiones al puerto 3000
var corsOptions = {
    origin: "http://localhost:3000"
};

//obtener todos los modelos y sincronizar sequelize
const db = require("./app/models");
const Role = db.perfiles;
const usuario = db.usuarios;
db.sequelize.sync();

//descomentar para reinicar la base de datos.

//db.sequelize.sync({force: true}).then(() => {
//   console.log('tirar y sincronizar db.');
//   initial();
// });

function initial() {
    usuario.create({
        id: 1,
        username: "miusuario",
        password: bcrypt.hashSync("password", 8),
        correo: "micorreo@gmail.com",
        telefono: "3311494217",
        estatus: 1,
        perfil_id: 3
    });

    Role.create({
        id: 1,
        nombre: "usuario",
        descripcion: "Usuario con limites"
    });

    Role.create({
        id: 2,
        nombre: "moderador",
        descripcion: "Usuario con limites de administracion"
    });

    Role.create({
        id: 3,
        nombre: "admin",
        descripcion: "Usuario sin limites"
    });
}


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// simple route
app.get("/", (req, res) => {
    res.json({message: "Funciona!!."});
});

// set port, listen for requests
const PORT = process.env.PORT || 8070;
//insercion de rutas para el funcionamiento
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
