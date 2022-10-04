const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true
  },
  userEmail: {
    type: String,
    require: true
  },
  questionOne: {
    type: String,
    require: true
  },
  questionTwo: {
    type: String,
    require: true
  },
  giveFeedback: {
    type: Boolean,
    require: true
  }
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;