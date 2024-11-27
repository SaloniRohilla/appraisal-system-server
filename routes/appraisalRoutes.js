const express = require('express');
const router = express.Router();
const { createAppraisal, getAppraisals } = require('../controllers/appraisalController');
const auth = require('../middleware/auth');

// Route to create a new appraisal
router.post('/', auth, createAppraisal);

// Route to fetch appraisals based on user role (admin, supervisor, peer, junior)
router.get('/', auth, getAppraisals);

module.exports = router;
