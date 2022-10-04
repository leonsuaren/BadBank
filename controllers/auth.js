const User = require('../models/user');

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    return res.status(400).json({ message: 'User already exist, Please try again', success: false });
  }
  try {
    const user = await User.create({ username, email, password });
    res.status(200).json({ message: 'User created success', success: true, user: user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Please try again", success: false, error: error});
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are require', success: false });
  }
  try {
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: 'No user found, please register', success: false });
    }
    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Password', success: false });
    }
    const token = user.getSignedToken();
    res.status(200).json({ message: 'Login Success', user: user, token: token, success: true });
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.findAUser = async (req, res, next) => {
  const { receiverEmail, senderEmail } = req.body;
  if (receiverEmail === null || receiverEmail === '' || receiverEmail === undefined) {
    return res.status(404).json({ message: 'Email field can\'t be empty!', success: false, error: true });
  }
  try {
    const receiverInfo = await User.findOne({ email: receiverEmail });
    const senderInfo = await User.findOne({ email: senderEmail });
    if (!receiverInfo || receiverInfo === null) {
      return res.status(404).json({ message: 'Email not found in our records, please try another email!', success: false, error: true });
    }
    if (senderInfo.email === receiverInfo.email) {
      return res.status(400).json({ message: 'Sender Email and Receiver Email can\'t be the same' });
    }
    res.status(200).json({ message: 'Email available to transfer!', success: true, senderInfo: senderInfo, error: false });
  } catch (err) {
    res.status(404).json({ message: 'Server error, please try again later!', success: false, error: true, err: err });
  }
}