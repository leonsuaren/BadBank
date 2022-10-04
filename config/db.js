const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://leonsuarez:badbank@badbank.mn7kwbo.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('MongoDB connect');
}

module.exports = connectDB;