'use strict';

const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const userController = require('../controllers/user.controller');
const { verifyAccessToken } = require('../utils/jwt_service');

router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.get('/logout', verifyAccessToken, userController.logout);
router.get('/detail/:userId', verifyAccessToken, userController.getInfo);

module.exports = router;
