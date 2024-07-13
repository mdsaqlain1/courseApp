const jwt = require('jsonwebtoken');
let SECRET = "S#CR#T";

const authenticateJwt = (req, res, next) =>{
    const authHeaders = req.headers.authorization;
    console.log(authHeaders);
    const authKey = authHeaders.split(' ')[1];
    if(authKey){
      jwt.verify(authKey, SECRET, (err, user)=>{
        if(err){
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    }
  }
  module.exports = {
    authenticateJwt,
    SECRET
  }