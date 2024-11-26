const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['ADMIN', 'SUPERVISOR', 'STAFF'], 
    required: true 
  },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  peers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  juniors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('User', UserSchema);