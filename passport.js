const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const BloggerModel = require('./Models/bloggerModel');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET || 'something_secret',
            // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // Use this if you are using Bearer token
        },
        async (token, done) => {
            try {
                return done(null, token.blogger);
            } catch (error) {
                done(error);
            }
        }
    )
);


// This middleware saves the information provided by the user to the database,
// and then sends the user information to the next middleware if successful.
// Otherwise, it reports an error.

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const blogger = await BloggerModel.create({ username, password });

                return done(null, blogger, { message: 'You can now create blogs!'});
            } catch (error) {
                console.log(error)
                done(error);
            }
        }
    )
);

// This middleware authenticates the user based on the username and password provided.
// If the user is found, it sends the user information to the next middleware.
// Otherwise, it reports an error.
passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            try {
                const blogger = await BloggerModel.findOne({ username });


                if (!blogger) {
                    return done(null, false, { message: 'User not found' });
                }

                const validate = await blogger.isValidPassword(password);

                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }

                return done(null, blogger, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);


