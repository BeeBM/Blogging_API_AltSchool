const jwt = require('jsonwebtoken');

// This function creates the authentication token for a blogger

const createToken = async (payload) => {
    try {
        const authToken = jwt.sign(
            payload, process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        return authToken;
    } catch(err) {
        return err
    }
}

module.exports = createToken;