
const express = require('express');
const router = express.Router();
const { getProfile, followUser } = require('../controllers/userController');

router.get('/:id', getProfile);
router.post('/follow', followUser);

module.exports = router;
