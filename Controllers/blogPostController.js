const BlogPostModel = require('../Models/blogPostModel');
const moment = require('moment');
const readingTime = require('reading-time');


//Create a BlogPost
function createBlogPost(req, res) {
    const NewBlogPost = new BlogPostModel(req.body);

    NewBlogPost.save((err, blogPost {}) => {
        if(err) {
            return res.status(422).json({ 
                msg: 'Error publishing blog post. Try again!',
                error: err
            });
        }
        else {
            return res.status(200).json({ 
                msg: 'Successfully published blog post.', 
                blogPost: blogPost
            });
        }
    });
}

//Get all the BlogPosts
function getAllBlogPosts(req, res) {
    BlogPostModel.find()
        .then(blogPosts => {
            res.send(blogPosts)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

//Get a BlogPost by Id
function getBlogPostByID(req, res) {
    const id = req.params.id
    BlogPostModel.findById(id)
        .then(blogPost => {
            res.status(200).send(blogPost)
        }).catch(err => {
            console.log(err)
            res.status(404).send(err)
        })
}

//Update a BlogPost from draft to published
function updateBlogPost(req, res) {
    const id = req.params.id;
    const state = req.body;
    const blogPost = BlogPostModel.findById(id)

    if (!blogPost) {
        return res.status(404).json({ status: false, order: null })
    }

    blogPost.state = state;
    blogPost.save()
    return res.json({ status: true, blogPost })
}

//Delete a BlogPost
function deleteBlogPostByID(req, res) {
    const id = req.params.id
    BlogPostModel.findByIdAndRemove(id)
        .then(blogPost => {
            res.status(200).send(blogPost)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}

module.exports = {
    getAllBlogPosts,
    getBlogPostByID,
    createBlogPost,
    updateBlogPost,
    deleteBlogPostByID
}