const {authJwt} = require("../middleware");
const controller = require("../controllers/users.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/all", controller.allAccess);
    app.get(
        "/api/user",
        [authJwt.verifyToken],
        controller.userBoard
    );
  app.get(
      "/api/mod",
      [authJwt.verifyToken],
      controller.userBoard
  );
  app.get(
      "/api/admin",
      [authJwt.verifyToken],
      controller.userBoard
  );
    app.get(
        "/api/obtenerusuarios",
        [authJwt.verifyToken],
        controller.obtenerUsuarios
    );
    app.get(
        "/api/obtenerperfiles",
        [authJwt.verifyToken],
        controller.obtenerPerfiles
    );
    app.post(
        "/api/obtenerusuario",
        [authJwt.verifyToken],
        controller.obtenerUsuario
    );

};
