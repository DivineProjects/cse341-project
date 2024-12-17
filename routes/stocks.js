const routes = require("express").Router();
const controller = require("../controllers/stocks");
const { isAuthenticated } = require("../middleware/authenticate")
const { stockValidationRules, getSingleValidationRules, validate } = require('../validators/stockValidationRules'); // import validation rules

// Get all stocks
routes.get("/", async (req, res) => {
    try {
      await controller.getAll(req, res);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while retrieving the stocks." });
    }
});
  
// Get a single stock by symbol
routes.get("/:symbol", getSingleValidationRules(), validate, async (req, res) => {
    try {
      await controller.getSingle(req, res);
    } catch (error) {
      if (error.message === "Stock not found") {
        return res.status(404).json({ message: `Stock with symbol ${req.params.symbol} not found.` });
      }
      res.status(500).json({ message: "An error occurred while retrieving the stock." });
    }
});

// Create a new stock
routes.post("/", isAuthenticated, stockValidationRules(), validate, async (req, res) => {
    try {
      await controller.createStock(req, res);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while creating the stock." });
    }
});
  
// Update an existing stock
routes.put("/:id", isAuthenticated, stockValidationRules(), validate, async (req, res) => {
    try {
        await controller.updateStock(req, res);
    } catch (error) {
        if (error.message === "Stock not found") {
        return res.status(404).json({ message: `Stock with ID ${req.params.id} not found.` });
        }
        res.status(500).json({ message: "An error occurred while updating the stock." });
    }
});

// Delete a stock
routes.delete("/:id", isAuthenticated, async (req, res) => {
    try {
        await controller.deleteStock(req, res);
    } catch (error) {
        if (error.message === "Stock not found") {
        return res.status(404).json({ message: `Stock with ID ${req.params.id} not found.` });
        }
        res.status(500).json({ message: "An error occurred while deleting the stock." });
    }
});

module.exports = routes;