const BloggerModel = require('../Models/bloggerModel');
const createToken = require('../Utils/authenticate');

require('dotenv').config();

exports.signup = async (req, res) => {
    
    const bloggerExists = await BloggerModel.findOne({ email: req.body.email})
    if (bloggerExists) {
        return res.status(409).json({
            message: "Blogger exists, please sign in!"
        })
    }

    try {
        const blogger = await BloggerModel.create(req.body);
        const { firstname, lastname, email } = blogger;
        const token = await createToken({firstname, lastname, email})
        return res.status(201).json({
            message: 'Signup successful',
            blogger,
            token
        });
    } catch(err) {
        return res.json({status: false, error: err, message: "Something went wrong!"})
    }
}

exports.login = async (req, res) => {
    const { password } = req.body;
    try {
        const blogger = await BloggerModel.findOne({email: req.body.email});
        
        if (!blogger) {
            return res.status(400).json({ message: 'Blogger not found' });
        }
        
        const validate = await blogger.isValidPassword(password);
        
        if (!validate) {
            return res.status(401).json({ message: 'Wrong email or password, please re-enter your details' });
        }
        
        const { firstname, lastname, email } = blogger;
        const token = await createToken({firstname, lastname, email})

        return res.status(200).json({ message: 'Logged in Successfully', blogger, token });
    } catch (error) {
        return res.status(500).json(error);
    }
}