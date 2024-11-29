const { response } = require("express");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  // #swagger.tags=["Stocks"]
  // Fetch the database and collection
  const db = mongodb.getDatabase();
  const result = await db.collection("stockSummary").find();
  result.toArray().then((stocks) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(stocks);
  });
};

const getSingle = async (req, res) => {
  // #swagger.tags=["Stocks"]
  const stockSymbol = req.params.symbol;
  try {
    // Fetch the database and the "stockSummary" collection
    const db = mongodb.getDatabase();
    const result = await db.collection("stockSummary").find({ symbol: stockSymbol });

    result.toArray().then((stock) => {
      if (Object.keys(stock).length === 0) {
        return res.status(404).json({ message: `${stockSymbol} not found` });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(stock[0]);
  });
  } catch (err) {
    return res.status(500).json({ message: "Error Fetching all Stocks" });
  }
  
};

const createStock = async (req, res) => {
  // #swagger.tags=["Stocks"]

  const stock = {
    symbol: req.body.symbol,
    company_name: req.body.company_name,
    current_price: req.body.current_price,
    volume: req.body.volume,
    market_cap: req.body.market_cap,
    pe_ratio: req.body.pe_ratio,
    dividend_yield: req.body.dividend_yield,
    '52_week_high': req.body['52_week_high'],
    '52_week_low': req.body['52_week_low'],
    sector: req.body.sector,
    industry: req.body.industry,
    currency: req.body.currency,
    last_updated: req.body.last_updated,
  };
  
  const db = mongodb.getDatabase();
  const response = await db.collection("stockSummary").insertOne(stock);
  if (response.acknowledged){
    res.status(201).send();
  } else
  {
    res.status(500).json(response.error || "Failed to creat the stock")
  }
};

const updateStock = async (req, res) => {
  // #swagger.tags=["Stocks"]
  const stockId = new ObjectId(req.params.id);
  const stock = {
    symbol: req.body.symbol,
    company_name: req.body.company_name,
    current_price: req.body.current_price,
    volume: req.body.volume,
    market_cap: req.body.market_cap,
    pe_ratio: req.body.pe_ratio,
    dividend_yield: req.body.dividend_yield,
    '52_week_high': req.body['52_week_high'],
    '52_week_low': req.body['52_week_low'],
    sector: req.body.sector,
    industry: req.body.industry,
    currency: req.body.currency,
    last_updated: req.body.last_updated,
  };
  const db = mongodb.getDatabase();
  const response = await db.collection("stockSummary").replaceOne({ _id : stockId }, stock);
  if (response.modifiedCount > 0){
    res.status(204).send();
  } else
  {
    res.status(500).json(response.error || "Failed to update the stock")
  }
};

const deleteStock = async (req, res) => {
  // #swagger.tags=["Stocks"]
  const stockId = new ObjectId(req.params.id);
  const db = mongodb.getDatabase();
  const response = await db.collection("stockSummary").deleteOne({ _id : stockId });
  if (response.deletedCount > 0){
    res.status(204).send();
  } else
  {
    res.status(500).json(response.error || "Failed to delete the stock")
  }
};

module.exports ={
    getAll,
    getSingle,
    createStock,
    updateStock,
    deleteStock
}