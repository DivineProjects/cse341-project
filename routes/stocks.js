const routes = require("express").Router();
const controller = require("../controllers/stocks");

routes.get("/", controller.getAll);
routes.get("/:symbol", controller.getSingle);
routes.post("/", controller.createStock);
routes.put("/:id", controller.updateStock);
routes.delete("/:id", controller.deleteStock);

module.exports = routes;