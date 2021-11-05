const {verifySignUp} = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/registrar", controller.guardar);
    app.post("/api/editar", controller.editar);
    app.post("/api/desactivar", controller.desactivar);
    app.post("/api/activar", controller.activar);
    app.post("/api/login", controller.login);
    app.get("/api/login",
        (req, res) => {
            console.log(req.body);
            res.json({message: "peticion incorrecta!!."});
        });
    app.get("/api/perfiles",
        (req, res) => {
            console.log(req.body);
            res.json({message: "peticion incorrecta!!."});
        });

};
