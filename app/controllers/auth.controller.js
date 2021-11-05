const db = require("../models");
const config = require("../config/auth.config");
const usuarios = db.usuarios;
const perfiles = db.perfiles;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


/**
 * funcion para guardar los usuarios valida que el usuario y el correo no existan previmente
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.guardar = async (req, res) => {
    //verificar que no exista el usuario
    let existeUsuario = false;
    let existeCorreo = false;
    await usuarios.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (user) {
                existeUsuario = true;
            }
        });
    await usuarios.findOne({
        where: {
            correo: req.body.email
        }
    })
        .then(user => {
            if (user) {
                existeCorreo = true;
            }
        });

    if (existeUsuario) {
        return res.status(404).send({message: "usuario existente."});
    } else if (existeCorreo) {
        return res.status(404).send({message: "correo ya registrado."});
    } else {
        await usuarios.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            correo: req.body.email,
            telefono: req.body.telefono,
            perfil_id: req.body.perfil,
            estatus: req.body.estatus,
        })
            .then(user => {
                res.send({message: "Usuario Registrado Correctamente"});
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    }
};

/**
 * funcion para el login de usuarios del sistema
 * si el usuario no exista manda mensaje
 * si el usuario no ingreso el password correcto manda mensaje
 * si el usuario esta desactivado manda mensaje
 * @param req
 * @param res
 */
exports.login = (req, res) => {


    usuarios.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({message: "usuario no encontrado."});
            }
            if(user.estatus == 0){
                return res.status(404).send({message: "usuario desactivado."});
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "password invalido!"
                });
            }

            var token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            var normalizedDate = new Date(Date.now()).toISOString();
            var fechaexpiracion = new Date(new Date(normalizedDate).getTime() + 60 * 60 * 24 * 1000);

            usuarios.update(
                {
                    token: token,
                    token_expiracion: fechaexpiracion
                },
                {where: {id: user.id}}).then(update => {

                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.correo,
                    accessToken: token
                });

            });

        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};


/**
 * funcion para editar usuarios
 * @param req
 * @param res
 */
exports.editar = (req, res) => {
    usuarios.update({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            correo: req.body.email,
            telefono: req.body.telefono,
            perfil_id: req.body.perfil,
            estatus: req.body.estatus,
        },
        {where: {id: req.body.id}})
        .then(user => {
            res.send({message: "Usuario Editado Correctamente"});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

/**
 * funcion para desactivar usuarios
 * @param req
 * @param res
 */
exports.desactivar = (req, res) => {
    usuarios.update({
            estatus: 0,
        },
        {where: {id: req.body.userId}})
        .then(user => {
            res.send({message: "Usuario Desactivado Correctamente"});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

/**
 * funcion para reactivar usuarios
 * @param req
 * @param res
 */
exports.activar = (req, res) => {
    usuarios.update({
            estatus: 1,
        },
        {where: {id: req.body.userId}})
        .then(user => {
            res.send({message: "Usuario Activado Correctamente"});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};
