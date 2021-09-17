require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const user = require("./routes/user");
const http = require("http");
const fs = require("fs");
// Init app
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

const server = http.createServer(app);

// Connect database
require("./db/db");

// Middleware
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));

app.use(cors({  
  origin: [ "http://localhost:3000"],
  credentials: true,
}));

// Static Files
app.use(express.static("uploads"));

// Config winston
require("./config/winston");

// Routes
app.use("/api/user", user);

// static assets for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Connect port
const port = 5001;
server.listen(port, () => console.log(`App running on port ${port}`));