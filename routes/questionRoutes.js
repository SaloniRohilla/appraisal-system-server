const express = require('express');
const router = express.Router();
const { createQuestion, getAllQuestions } = require('../controllers/questionController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/', 
  [auth, roleCheck(['ADMIN'])], 
  createQuestion
);

router.get('/', 
  auth, 
  getAllQuestions
);

module.exports = router;