const Question = require('../models/Question');

exports.createQuestion = async (req, res) => {
  try {
    const { text, category } = req.body;
    const question = new Question({ text, category });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ isActive: true });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};