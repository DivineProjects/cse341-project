const swaggerAutogen = require("swagger-autogen")();

const doc = {
    Info: {
        title: "stocks Api",
        description: "Stocks Api"
    },
    host: "localhost:8080",
    schemes: ["http"]
};

const outputFile = "./swagger.json";
const endpointFile = ["./routes/index.js"];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointFile, doc);
