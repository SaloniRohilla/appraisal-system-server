const Appraisal = require('../models/Appraisal');
const User = require('../models/User');

exports.createAppraisal = async (req, res) => {
  try {
    const { employee, evaluator, questions } = req.body;
    
    const appraisal = new Appraisal({
      employee,
      evaluator,
      questions
    });

    await appraisal.save();
    res.status(201).json(appraisal);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAppraisals = async (req, res) => {
  try {
    const { role, userId } = req.user;
    let appraisals;

    switch (role) {
      case 'ADMIN':
        appraisals = await Appraisal.find()
          .populate('employee', 'name')
          .populate('evaluator', 'name');
        break;
      case 'SUPERVISOR':
        const superviseUser = await User.findById(userId);
        appraisals = await Appraisal.find({
          $or: [
            { employee: superviseUser.juniors },
            { employee: userId }
          ]
        }).populate('employee', 'name')
          .populate('evaluator', 'name');
        break;
      default:
        appraisals = await Appraisal.find({ 
          $or: [
            { employee: userId },
            { evaluator: userId }
          ]
        }).populate('employee', 'name')
          .populate('evaluator', 'name');
    }

    res.json(appraisals);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};