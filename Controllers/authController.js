const jwt = require('jsonwebtoken');
const BloggerModel = require('../Models/bloggerModel');

require('dotenv').config();

exports.signup = async (req, res) => {

    const blogger = await BloggerModel.findOne({ username: req.blogger.username})

    blogger.firstname = req.body.firstName
    blogger.lastname = req.body.lastName
    blogger.email = req.body.email

    await blogger.save()

    delete blogger.password

    res.status(201).json({
        message: 'Signup successful',
        blogger: blogger
    });
}

exports.login = (req, res, { err, blogger, info}) => {

    if (!blogger) {
        return res.json({ message: 'Username or password is incorrect'})
    }

    // req.login is provided by passport
    req.login(blogger, { session: false },
        async (error) => {
            if (error) return res.status(400).json(error)

            const body = { _id: blogger._id, username: blogger.username };
            //You store the id and username in the payload of the JWT. 
            // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
            // DO NOT STORE PASSWORDS IN THE JWT!
            const token = jwt.sign({ blogger: body }, process.env.JWT_SECRET, {expiresIn: '1h'} || 'something_secret');

            return res.status(200).json({ token });
        }
    );
}