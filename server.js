const express = require("express");
const app = express();
const PORT = 3000;

const port = process.env.PORT || PORT;

app.use("/", require("./routes"));

app.listen(port, () => {
    console.log(`App running on Port: ${PORT}`);
});
