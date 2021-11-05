module.exports = (sequelize, Sequelize) => {
    const Perfiles = sequelize.define("perfiles", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.CHAR(128)
        },
        descripcion: {
            type: Sequelize.STRING
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
        estatus: {
            type: Sequelize.INTEGER
        }
    });
    return Perfiles;
};