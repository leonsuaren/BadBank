const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  });
  console.log('MongoDB connect');
}

module.exports = connectDB;