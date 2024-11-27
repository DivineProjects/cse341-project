const routes = require("express").Router();
const controller = require("../controllers/users");

routes.get("/", controller.getAll);
routes.get("/:id", controller.getSingle);
routes.post("/", controller.createUser);
routes.put("/:id", controller.updateUser);
routes.delete("/:id", controller.deleteUser);

module.exports = routes;