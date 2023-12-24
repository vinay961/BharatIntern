const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();

// Body-parser middleware to parse JSON-encoded bodies
app.use(bodyParser.json());

// Body-parser middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
mongoose.connect("mongodb://0.0.0.0:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Error while connecting to database:', error);
});
db.once('open', () => {
  console.log("Database is connected successfully");
});

// Router Setting
const user = require('./router/userRouter.js');
app.use('/', user);

// Server Connection
const port = 3000;
app.listen(port, () => { 
    console.log(`Server is running on http://localhost:${port}`);
});
