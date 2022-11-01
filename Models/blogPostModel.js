const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

//Enable blogpost ID
const BlogPostId = Schema.ObjectId;

//Define blogPost schema
const BlogPostSchema = new Schema({
    id: BlogPostId,
    title: {
        type: String,
        required: true,
        unique: [true, 'This title already exists!'] //validation with custom message
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    state:  { 
        type: String, 
        required: true, 
        enum: ['draft', 'published'], 
        default: 'draft' 
    },
    read_count: {
        type: Number
    },
    reading_time: {
        type: String
    },
    tags: [String],
    updated: {
      type: Date
    },
    body: {
        type: String,
        required: true
    },
    createAt : {
        type: Date,
        default: Date.now
    },
    lastUpdateAt : {
        type: Date,
        default: Date.now
    },
});

// Export the model
module.exports = mongoose.model('BlogPosts', BlogPostSchema); //The name of the collection in the database is Blogs.