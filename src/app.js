'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const authService = require('./services/auth-service');
const database = require('../bin/db');
const User = require('./models/user');

//Cria as tabelas na base de dados
database.sync();

//Carrega as rotas
const indexRoute = require('./routes/index-route');
const userRoute = require('./routes/user-route');
const taskRoute = require('./routes/task-route');
const authenticationRoute = require('./routes/authentication-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/', indexRoute);
app.use('/auth', authenticationRoute);
app.use('/user', userRoute);
app.use('/tasks', authService.authorize, taskRoute);

module.exports = app;