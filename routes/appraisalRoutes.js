const express = require('express');
const router = express.Router();
const { createAppraisal, getAppraisals } = require('../controllers/appraisalController');
const auth = require('../middleware/auth');

router.post('/', auth, createAppraisal);
router.get('/', auth, getAppraisals);

module.exports = router;