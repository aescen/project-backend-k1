const mongoose = require('mongoose');

// set false to wait connection before using models
mongoose.set('bufferCommands', false);

const url = process.env.DATABASE_MONGODBATLAS || 'mongodb://0.0.0.0:27017';

const dbConnection = mongoose.connect(url, {
  serverSelectionTimeoutMS: 8000, // Timeout after 8s instead of 30s
});

module.exports = dbConnection;
