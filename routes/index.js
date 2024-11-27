const routes = require("express").Router();

routes.use("/", require("./swagger"));

routes.get('/', (req, res) => {
  // #swagger.tags=["Hello World"]
    res.send("Home Page ...");
  });

routes.use("/users", require("./users"));
routes.use("/stocks", require("./stocks"));


module.exports = routes;