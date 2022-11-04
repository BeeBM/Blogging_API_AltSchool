const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

//Enable Blogger ID
const BloggerId = Schema.ObjectId;

//Define blogger schema
const BloggerSchema = new Schema({
    Id: BloggerId,
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists!'] //validation with custom message
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: false,
    },
    createAt : {
        type: Date,
        default: Date.now
    }
});

// Export the model
module.exports = mongoose.model('Bloggers', BloggerSchema); //The name of the collection in the database is Bloggers.