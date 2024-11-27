const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/stockApi", swaggerUi.serve);
router.get("/stockApi", swaggerUi.setup(swaggerDocument));

module.exports = router;


