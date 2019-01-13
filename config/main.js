module.exports = {  
    // Secret key for JWT signing and encryption
    'secret': process.env.secret || 'PsYVjiMAxuMY2IM/zL5X3GP2JaS6Ba8AhVgRyoTeIk7VxtM6ztFRrpFVL3Gu+JX',
    // Database connection information
    'database': process.env.database ||'mongodb://localhost:27017/auth',
    // Setting port for server
    'port': process.env.PORT || 3000
  }