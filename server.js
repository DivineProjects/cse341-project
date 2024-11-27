const express = require("express");
const app = express();
const mongodb = require("./data/database");
const bodyParser = require("body-parser");

const PORT = 8081;
const port = process.env.PORT || PORT;

app.use(bodyParser.json());
// CORS middleware to allow cross-origin requests
app.use((req, res, next) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all domains, or specify a domain
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Z-Key'); // Allow these headers

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow these methods
  
  next();
});
// Use routes defined in routes/index.js
app.use("/", require("./routes"));

// Initialize the database
mongodb.initDb((err) => {
    if (err) {
      console.error("Failed to connect to MongoDB", err);
      process.exit(1); // Exit the process if the DB connection fails
    }
  
    console.log("Connected to MongoDB ...");
    // Start the server once the DB is connected
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  });
  