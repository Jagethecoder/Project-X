
const User = require('../models/User');

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.params.id).populate('friends following');
  res.json(user);
};

exports.followUser = async (req, res) => {
  const { userId, targetId } = req.body;
  await User.findByIdAndUpdate(userId, { $addToSet: { following: targetId } });
  await User.findByIdAndUpdate(targetId, { $addToSet: { friends: userId } });
  res.json({ message: 'Followed' });
};
