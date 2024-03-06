require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

// database connection
const mongoUrl = process.env.DATABASE_URL;
mongoose.connect(mongoUrl);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

//set up Express to create an app and configure it to parse requests with JSON payloads. Here’s the code you can add to do that:
const app = express();

app.use(cors());
app.use(express.json());
// endpoint
app.use("/api", routes);

// we'll connect to a port to listen for incoming requests
const PORT = process.env.PORT || 3000;
// * With the process.env.PORT variable, we set up the port automatically by allowing the API to be deployed to a cloud platform like AWS or Azure. In case the process.env.PORT variable is not set, we’ll default to using port 3000.
// set up the server to listen on the specified port:
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
