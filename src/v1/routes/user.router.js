'use strict';

const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const User = require('../models/user.model');
const { userValidation } = require('../utils/validation');
const { signAccessToken, verifyAccessToken, signRefreshToken } = require('../utils/jwt_service');

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = userValidation(req.body);

    if (error) throw createError(error.details[0].message);

    // if (!email || !password) throw createError.BadRequest();

    const isExits = await User.findOne({
      username: email
    });

    if (isExits) {
      throw createError.Conflict(`${email} is ready been register`);
    }

    // const isCreate = await User.create({
    //   username: email,
    //   password
    // });

    const user = new User({
      username:email,
      password
    });

    const savedUser = await user.save();

    return res.status(200).json({
      status: 'success',
      message: 'api register ok',
      element: savedUser
  })
  } catch (error) {
    next(error);
  }
});

router.get('/refresh-token', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'api refresh-token ok'
  })
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = userValidation(req.body);

    if (error) throw createError(error.details[0].message);

    const user = await User.findOne({ email });

    if (!user) {
      throw createError.NotFound('User not registered');
    }

    const isValid = await user.isCheckPassword(password);

    if (!isValid) {
      throw createError.Unauthorized();
    }
    const accessToken = await signAccessToken(user._id);
    const refereshToken = await signRefreshToken(user._id);
    res.json({
      accessToken,
      refereshToken
    });

  } catch (error) {
    next(error)
  }
});

router.get('/logout', (req, res, next) => {
  res.status(200).json({
      status: 'success',
      message: 'api logout ok'
  })
});

router.get('/getLists', verifyAccessToken, (req, res, next) => {
  const listUsers = [
    {
      email: 'abc@gmail.com'
    },
    {
      email: 'def@gmail.com'
    },
    {
      email: 'ikl@gmail.com'
    },
  ];

  res.json({
    listUsers
  })
});

module.exports = router;
