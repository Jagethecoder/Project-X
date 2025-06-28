
const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { userId, caption } = req.body;
  const mediaUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const post = await Post.create({ user: userId, caption, mediaUrl });
  res.json(post);
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).populate('user');
  res.json(posts);
};
