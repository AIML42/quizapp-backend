require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected to DB');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
  } catch (error) {
    console.error('Error connecting to DB:', error);
    throw error;
  }
};

// Connect immediately when the module is imported
connectDB();

module.exports = connectDB;