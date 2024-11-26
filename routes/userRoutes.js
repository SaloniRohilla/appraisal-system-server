const express = require('express');
const router = express.Router();
const { mapParticipants } = require('../controllers/userController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/map-participants', 
  [auth, roleCheck(['ADMIN'])], 
  mapParticipants
);

module.exports = router;