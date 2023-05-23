'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
  displayName: {
    type: String,
    required: false
  },
}, {timestamps: true});

UserSchema.pre('save', async function(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isCheckPassword = async function (password) {
  try {
    return  await bcrypt.compare(password, this.password);
  } catch (error) {
    
  }
}

module.exports = mongoose.model('User', UserSchema);
