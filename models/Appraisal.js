const mongoose = require('mongoose');

const AppraisalSchema = new mongoose.Schema({
  employee: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  evaluator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  questions: [{
    question: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Question' 
    },
    rating: { type: Number, min: 1, max: 5 },
    comments: { type: String }
  }],
  status: { 
    type: String, 
    enum: ['PENDING', 'COMPLETED'], 
    default: 'PENDING' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appraisal', AppraisalSchema);