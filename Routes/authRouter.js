const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');


const AuthController = require('../Controllers/authController');

const authRouter = express.Router();

authRouter.post('/signup', passport.authenticate('signup', { session: false }), AuthController.signup)

authRouter.post('/login2', async (req, res, next) => passport.authenticate('login', (err, blogger, info) => {
    AuthController.login(req, res, { err, blogger, info})
})(req, res, next))


authRouter.post('/login',  async (req, res, next) => {
    passport.authenticate('login', async (err, blogger, info) => {
        try {
            if (err) {
                return next(err);
            }
            if (!blogger) {
                const error = new Error('Username or password is incorrect');
                return next(error);
            }

            req.login(blogger, { session: false },
                async (error) => {
                    if (error) return next(error);

                    const body = { _id: blogger._id, username: blogger.username };
                    //You store the id and username in the payload of the JWT. 
                    // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
                    // DO NOT STORE PASSWORDS IN THE JWT!
                    const token = jwt.sign({ blogger: body }, process.env.JWT_SECRET, {expiresIn: '1h'} || 'something_secret');

                    return res.json({ token });
                }
            );
        } catch (error) {
            return next(error);
        }
    }
    )(req, res, next);
})

module.exports = authRouter;
