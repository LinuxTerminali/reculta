module.exports = {  
    // Secret key for JWT signing and encryption
    'secret': process.env.secret,
    // Database connection information
    'database': process.env.database ||'mongodb://localhost:27017/auth',
    // Setting port for server
    'port': process.env.PORT || 3000
  }