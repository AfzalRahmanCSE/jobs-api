const jwt=require('jsonwebtoken')
async function getJwtToken(id,email) {
    return jwt.sign({ id,email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });
  }

  module.exports={
    getJwtToken
  }