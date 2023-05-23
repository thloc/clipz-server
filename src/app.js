'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

class AppController {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errors();
  }

  middlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(cookieParser());
    this.app.use(helmet());
    this.app.use(morgan('combined'));
  }
 
  routes() {
    this.app.use(cors({
      origin: 'http://127.0.0.1:4000',
      methods: ['POST', 'GET', 'PUT', 'DELETE']
    }));

    this.app.use(require('./v1/routes/index.router'));
    this.app.use(require('./v1/routes/user.router'));
  }

  errors() {
    this.app.use((req, res, next) => {
      // const error = new Error("Not found");
      // error.status = 404;
      // next(error); 
      next(createError.NotFound('This route does not exist.'));
    });

    this.app.use((error, req, res, next) => {
      res.status(error.status || 500).send({
          error: {
              status: error.status || 500,
              message: error.message || 'Internal Server Error',
          },
      });
    });
  }
}

module.exports = new AppController().app;
