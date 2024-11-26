const User = require('../models/User');

exports.mapParticipants = async (req, res) => {
  try {
    const { userId, supervisorId, peerIds, juniorIds } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        supervisor: supervisorId,
        peers: peerIds,
        juniors: juniorIds
      },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};