const routes = require("express").Router();
const controller = require("../controllers/stocks");
const { stockValidationRules, getSingleValidationRules, validate } = require('../validators/stockValidationRules'); // import validation rules

routes.get("/", controller.getAll);
routes.get("/:symbol", getSingleValidationRules(), validate, controller.getSingle);
routes.post("/", stockValidationRules(), validate, controller.createStock); // validate stock details before post
routes.put("/:id", stockValidationRules(), validate, controller.updateStock); // validate stock details before put
routes.delete("/:id", controller.deleteStock);

module.exports = routes;