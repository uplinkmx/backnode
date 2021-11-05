const db = require("../models");
const Usuarios = db.usuarios;

const Perfiles = db.perfiles;
const Op = db.Sequelize.Op;

/**
 * funcion para obtener la lista de usuarios
 * @param req
 * @param res
 */
exports.obtenerUsuarios = (req, res) => {

    Usuarios.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "ocurrio un error al obtener la informacion."
            });
        });
};
/**
 * funcion para obtener la lista de perfiles en el sistema
 * @param req
 * @param res
 */
exports.obtenerPerfiles = (req, res) => {

    Perfiles.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "ocurrio un error al obtener la informacion."
            });
        });
};
/**
 * funcion para obtener el datos de un usuario en especifico
 * @param req
 * @param res
 */
exports.obtenerUsuario = (req, res) => {
    console.log(req.body);

    Usuarios.findOne({
        where: {
            id: req.body.userId
        }
    })
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "ocurrio un error al obtener la informacion."
            });
        });
};

/**
 * funcion para mostrar informacion de libre accesso
 * @param req
 * @param res
 */
exports.allAccess = (req, res) => {
    res.status(200).send("Bienvenidos al sitio esta informacion se obtuvo desde la api en localhost:8070.");
};
/**
 * contenido de usuario
 * @param req
 * @param res
 */
exports.userBoard = (req, res) => {
    res.status(200).send("contenido del usuario.");
};
