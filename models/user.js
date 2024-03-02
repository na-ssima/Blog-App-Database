const mongoose = require('mongoose')

const UserShema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAT: {type: Date, default: Date.now},
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  })
  
  const User = mongoose.model('User', UserShema)
  
  module.exports = User;
  