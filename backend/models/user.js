
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            default: null  
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        authenticationkey: {
            type: String,
            default: false
        },
        category: {
            type: String,
            default: null
        },
        password: {
            type: String,
        },
        hash: {type: String},
        salt: {type: String},
    },
    { strict: false }
  );

  UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  };
  
  UserSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
  };
  
  UserSchema.methods.getEmail = function() {
    return this.email 
  }
  
  UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
  
    return jwt.sign({
      role: this.role,
      email: this.email,
      id: this._id,
      name: this.name,
      category: this.category,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
  }
  
  UserSchema.methods.toAuthJSON = function() {
    return {
      _id: this._id,
      email: this.email,
      category: this.category,
      token: 'Bearer ' + this.generateJWT(),
    };
  };
  
  
  module.exports = user = mongoose.model("Users", UserSchema);
  