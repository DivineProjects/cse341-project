const routes = require("express").Router();
const controller = require("../controllers/users");
const { userValidationRules, validate } = require('../validators/userValidationRules'); // validation rules

// routes.get("/", controller.getAll);
// Route to get all users
routes.get("/", async (req, res) => {
    try {
      await controller.getAll(req, res);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving users", error: err.message });
    }
});
  
// routes.get("/:id", controller.getSingle);
// Route to get a single user by ID
routes.get("/:id", async (req, res) => {
    try {
      await controller.getSingle(req, res);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving user", error: err.message });
    }
});

// routes.post("/", userValidationRules(), validate, controller.createUser); // validates user before post
// Route to create a user
routes.post("/", userValidationRules(), validate, async (req, res) => {
    try {
      await controller.createUser(req, res);
    } catch (err) {
      res.status(500).json({ message: "Error creating user", error: err.message });
    }
});
// routes.put("/:id", userValidationRules(), validate, controller.updateUser); // validates user before put
// Route to update a user by ID
routes.put("/:id", userValidationRules(), validate, async (req, res) => {
    try {
      await controller.updateUser(req, res);
    } catch (err) {
      res.status(500).json({ message: "Error updating user", error: err.message });
    }
  });
  
  // Route to delete a user by ID
  routes.delete("/:id", async (req, res) => {
    try {
      await controller.deleteUser(req, res);
    } catch (err) {
      res.status(500).json({ message: "Error deleting user", error: err.message });
    }
  });
// routes.delete("/:id", controller.deleteUser);

module.exports = routes;