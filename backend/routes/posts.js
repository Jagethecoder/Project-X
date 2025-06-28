
const express = require('express');
const router = express.Router();
const { createPost, getPosts } = require('../controllers/postController');
const upload = require('../utils/upload');

router.post('/', upload.single('media'), createPost);
router.get('/', getPosts);

module.exports = router;
