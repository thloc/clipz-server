'use strict';

const express = require('express');
require('dotenv').config();
require('./src/v1/databases/init.mongodb.js');

const app = require('./src/app');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is on at http://${HOST}:${PORT}`));
