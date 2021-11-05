module.exports = (sequelize, Sequelize) => {
    const Usuarios = sequelize.define("usuarios", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.CHAR(45)
        },
        password: {
            type: Sequelize.STRING
        },
        perfil_id: {
            type: Sequelize.INTEGER
        },
        correo: {
            type: Sequelize.CHAR(128)
        },
        telefono: {
            type: Sequelize.CHAR(128)
        },
        estatus: {
            type: Sequelize.INTEGER
        },
        fecha_creacion: {
            type: Sequelize.DATE
        },
        fecha_actualizacion: {
            type: Sequelize.DATE
        },
        usuario_id_creacion: {
            type: Sequelize.INTEGER
        },
        usuario_id_actualizacion: {
            type: Sequelize.INTEGER
        },
        token: {
            type: Sequelize.STRING
        },
        token_expiracion: {
            type: Sequelize.DATE
        }
    });
    return Usuarios;
};