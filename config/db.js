const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URL || `mongodb+srv://leonsuarez:badbank@badbank.mn7kwbo.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true
  });
  console.log('MongoDB connect');
}

module.exports = connectDB;