const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;


// This function authenticates/verifies that the action to be carried out is legal and
// checks the validity of the token
const authorization = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send({ message: 'token is required!', status: false });
  } else {
    // checks if token matches the one provided at login
    const rightToken = token.split(' ')[1]; // Splits the token to reveal the blogger
    jwt.verify(rightToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: 'Authentication failed! Token is Invalid or expired. Please Login again', status: false });
      } else {
        req.blogger = decoded;
        next();
      }
    });
  }
};

module.exports = authorization;
