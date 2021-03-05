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
app.use('/api/v1/autenticar', require(path.join(__dirname, 'src', 'controller', 'api', 'v1', 'autenticar.controller.ts')));
app.use('/api/v1/paciente', require(path.join(__dirname, 'src', 'controller', 'api', 'v1', 'paciente.controller.ts')));
app.use('/api/v1/agendamento', require(path.join(__dirname, 'src', 'controller', 'api', 'v1', 'agendamento.controller.ts')));
app.use('/api/v1/consulta', require(path.join(__dirname, 'src', 'controller', 'api', 'v1', 'consulta.controller.ts')));

module.exports = app