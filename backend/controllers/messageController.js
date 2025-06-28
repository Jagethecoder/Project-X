
const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  const { sender, receiver, text, voiceUrl } = req.body;
  const message = await Message.create({ sender, receiver, text, voiceUrl });
  res.json(message);
};

exports.getMessages = async (req, res) => {
  const { user1, user2 } = req.query;
  const messages = await Message.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 }
    ]
  }).sort({ createdAt: 1 });
  res.json(messages);
};
