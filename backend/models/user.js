var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
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
        email_is_verified: {
            type: Boolean,
            default: false
        },
        category: {
            type: String,
            default: null
        },
        password: {
            type: String,
            required: true
        }
    },
    { strict: false }
  );
  
  module.exports = user = mongoose.model("Users", UserSchema);