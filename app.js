// Load environment variables
if (process.env.NODE_ENV !== 'production') {
require('dotenv').config();
}

// Load required packages and libraries
const express = require("express");
// const { body } = require("express-validator"); sql attacks prevention code needed
const axios = require("axios");
const request = require("request");
const rateLimit = require("express-rate-limit");
const {
Api,
JsonRpc
} = require('eosjs');
const {
JsSignatureProvider
} = require('eosjs/dist/eosjs-jssig');
const fetch = require('node-fetch');
const {
TextDecoder,
TextEncoder
} = require('util');
const { setNickname } = require("./src/blockchain/nickname");
const playerRoutes = require("./src/routes.js");
const houseRoutes = require("./src/routes/houses.js");
const teamRoutes = require("./src/routes/teams.js");
const adventureRoutes = require("./src/routes/adventures.js");
const rewardRoutes = require("./src/routes/rewards.js");
const {
Pool
} = require('pg');

// Define constants
const delaySeconds = 10;
const delayMillis = delaySeconds * 1000;
const privateKeys = [process.env.MYKEY];
const mydbkey = process.env.DATABASE_URL;
const rpc = new JsonRpc("https://wax.cryptolions.io", {
fetch
});
const signatureProvider = new JsSignatureProvider(privateKeys);
const api = new Api({
rpc,
signatureProvider,
textDecoder: new TextDecoder(),
textEncoder: new TextEncoder()
});

// Create rate limiter
const apiLimiter = rateLimit({
windowMs: delayMillis,
max: 500,
message: "You have exceeded the maximum number of requests. Please try again later.",
headers: true,
onLimitReached: (req, res, options) => {
console.log("Rate limit reached for ${req.ip} at ${new Date()}");
}
});

// Create Express app
const app = express();

// Set up middleware
app.use(apiLimiter);
app.use(express.static("public"));
app.use(express.json({ limit: '1mb' }));
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", '*');
res.header("Access-Control-Allow-Credentials", true);
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
next();
});

// Set up routes
app.use("/players", playerRoutes);
app.use("/houses", houseRoutes);
app.use("/teams", teamRoutes);
app.use("/adventures", adventureRoutes);
app.use("/rewards", rewardRoutes);

// Define a route for setting a nickname
app.post('/nickname', (req, res) => {
var data = req.body;
setNickname(data);
});

// Define an error handler
app.use((error, req, res, next) => {
return res.status(500).json({
error: error.toString()
});
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log("Our app is running on port " + PORT);
});
