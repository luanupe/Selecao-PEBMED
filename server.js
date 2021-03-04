const dotenv = require('dotenv');
const express = require('express');

// Setup
dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Controllers
app.get('/', (req, res) => { res.json({ 'hello':'world' }) });

module.exports = app