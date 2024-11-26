const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['PERFORMANCE', 'SKILLS', 'BEHAVIOR'], 
    required: true 
  },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Question', QuestionSchema);