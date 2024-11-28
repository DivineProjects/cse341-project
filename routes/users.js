const routes = require("express").Router();
const controller = require("../controllers/users");
const { userValidationRules, validate } = require('../validators/userValidationRules'); // validation rules

routes.get("/", controller.getAll);
routes.get("/:id", controller.getSingle);
routes.post("/", userValidationRules(), validate, controller.createUser); // validates user before post
routes.put("/:id", userValidationRules(), validate, controller.updateUser); // validates user before put
routes.delete("/:id", controller.deleteUser);

module.exports = routes;