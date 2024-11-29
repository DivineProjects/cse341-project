const routes = require("express").Router();
const controller = require("../controllers/users");
const { userValidationRules, validate } = require('../validators/userValidationRules'); // validation rules

// Route to get all users
routes.get("/", async (req, res) => {
    try {
      await controller.getAll(req, res);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving users"});
    }
});
  
// Route to get a single user by ID
routes.get("/:id", async (req, res) => {
    try {
      await controller.getSingle(req, res);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving user" });
    }
});

// Route to create a user
routes.post("/", userValidationRules(), validate, async (req, res) => {
    try {
      await controller.createUser(req, res);
    } catch (err) {
      res.status(500).json({ message: "Error creating user" });
    }
});

// Route to update a user by ID
routes.put("/:id", userValidationRules(), validate, async (req, res) => {
    try {
      await controller.updateUser(req, res);
    } catch (err) {
      res.status(500).json({ message: "Error updating user" });
    }
  });
  
  // Route to delete a user by ID
routes.delete("/:id", async (req, res) => {
    try {
      await controller.deleteUser(req, res);
    } catch (err) {
      res.status(500).json({ message: "Error deleting user" });
    }
  });

module.exports = routes;