const path = require('path');
const dotenv = require('dotenv');
const express = require('express');

// Setup
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// Controllers
app.get('/', (req, res) => { res.json({ 'hello':'world' }) });

module.exports = app