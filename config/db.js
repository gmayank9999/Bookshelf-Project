const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB Atlas URI (replace with your actual URI)
    const mongoURI = 'mongodb+srv://mayankgupta23cse:mayank123@csecluster.8frrq.mongodb.net/';

    await mongoose.connect(mongoURI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection failed: ', err);
  }
};

module.exports = connectDB;
connectDB();
