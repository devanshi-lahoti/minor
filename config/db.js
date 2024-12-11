require('dotenv').config(); // Load environment variables from .env file

const dbConfig = {
  port: process.env.PORT || 3000,          // Default to 3000 if not defined in .env
  mongodbUri: process.env.MONGODB_URI,    // MongoDB URI from .env
  
};

module.exports = dbConfig;
