'use strict';

const createError = require('http-errors');

const User = require('../models/user.model');
const { userValidation, loginValidation } = require('../utils/validation');
const { signAccessToken, signRefreshToken } = require('../utils/jwt_service');

exports.createUser = async (req, res, next) => {
  try {
    const { email, password, ...obj } = req.body;
    const { error } = userValidation(req.body);

    if (error) throw createError(error.details[0].message);

    const isExits = await User.findOne({email: email});

    if (isExits) {
      throw createError.Conflict(`${email} is ready been register`);
    }

    const user = new User({
      email,
      password,
      ...obj
    });

    const userSaved = await user.save();

    return res.status(200).json({
      status: 'success'
    });
  } catch (error) {
    next(error);
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = loginValidation(req.body);

    if (error) throw createError(error.details[0].message);

    const user = await User.findOne({ email });

    if (!user) {
      throw createError.NotFound(`${email} not registered`);
    }

    const isValid = await user.isCheckPassword(password);

    if (!isValid) {
      throw createError.Unauthorized();
    }

    const accessToken = await signAccessToken(user._id);
    const refereshToken = await signRefreshToken(user._id);

    return res.status(200).json({
      status: 'success',
      token: accessToken,
      refereshToken: refereshToken,
      displayName: user.displayName || "",
      account_id: user._id
    });
  } catch (error) {
    next(error)
  }
}

exports.logout = (req, res, next) => {
  try {
    delete req.headers['authorization'];
    res.clearCookie('token');

    return res.status(200).json({
      status: 'success',
      message: 'Logout successful'
    })
  } catch (error) {
    next(error)
  }
}
