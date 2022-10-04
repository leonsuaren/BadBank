const Feedback = require('../models/feedback');
const User = require('../models/user');

exports.feedback = async (req, res, next) => {
  const { userEmail, questionOne, questionTwo } = req.body;
  try {
    const feedback = await Feedback.create({ userEmail: userEmail, questionOne: questionOne, questionTwo: questionTwo });
    res.status(200).json({ message: 'feedback received', feedback: feedback, success: true });
  } catch (error) {
    res.status(400).json({ message: 'Server Error', error: error, success: false });
  }
}

exports.userGiveFeedback = async (req, res, next) => {
  const { userEmail } = req.body;
  try {
    const user = await User.updateOne({ email: userEmail }, { $set: { feedback: true } });
    res.status(200).json({ message: 'Feedback updated successfully', success: true, user: user });
  } catch (error) {
    res.status(400).json({ message: 'Server Error', success: false, error: error })
  }
}