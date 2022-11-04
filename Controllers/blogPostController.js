const BlogPostModel = require('../Models/blogPostModel');
// const moment = require('moment');
const readingTime = require('reading-time');
const session = require('express-session');

//Get all the BlogPosts
async function getAllBlogPosts(req, res) {
    const { query } = req;

        const { 
            author, 
            title, 
            tags, 
            read_count,
            reading_time,
            order_by = 'createAt', 
            page = 1, 
            per_page = 20 
        } = query;

        const findQuery = {};

        if (author) {
            findQuery.author = author;
        } 

        if (title) {
            findQuery.title = title;
        }

        if (tags) {
            findQuery.tags = tags;
        }
    
        const sortQuery = {};

        const sortAttributes = order_by.split(',')

        for (const attribute of sortAttributes) {
            if (blogPosts === 'asc' && order_by) {
                sortQuery[attribute] = 1
            }
    
            if (blogPosts === 'desc' && order_by) {
                sortQuery[attribute] = -1
            }

            if (blogPosts === 'asc' && read_count) {
                sortQuery[attribute] = 1
            }

            if (blogPosts === 'desc' && read_count) {
                sortQuery[attribute] = -1
            }

            if (blogPosts === 'asc' && reading_time) {
                sortQuery[attribute] = 1
            }

            if (blogPosts === 'desc' && reading_time) {
                sortQuery[attribute] = -1
            }
        }


        const blogPosts = await BlogPostModel
        .find(findQuery)
        .sort(sortQuery)
        .skip(page)
        .limit(per_page)

    return res.status(200).json({ status: true, blogPosts })
}

//Get a BlogPost by Id 
function getBlogPostByID(req, res) {
    const id = req.params.id

    // let read_count = 0;
    // for i 

    BlogPostModel.findById(id)
        .then(blogPost => {
            res.status(200).send(blogPost)
        }).catch(err => {
            console.log(err)
            res.status(404).send(err)
        })
}

//Create a BlogPost
const createBlogPost = async (req, res, next) => {
    const body = req.body;

    const reading_time = readingTime(req.body.blogPostBody);

    try {
        const NewBlogPost = await BlogPostModel.create({
            body,
            read_count,
            reading_time
        });
        return res.json({ status: true, NewBlogPost })
    } catch(err) {
        return res.json({status: false, error: err})
    }
};

//Edit detail(s) of a BlogPost
function editBlogPost(req, res) {
    const id = req.params.id;
  
    const blogPost = req.body;
    blogPost.lastUpdateAt = new Date() // set the lastUpdateAt to the current date
    BlogPostModel.findByIdAndUpdate(id, blogPost, { new: true })
        .then(editedBlogPost => {
            res.status(200).send(editedBlogPost)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}

//Delete a BlogPost
function deleteBlogPostByID(req, res) {
    const id = req.params.id
    BlogPostModel.findByIdAndRemove(id)
        .then(blogPost => {
            res.status(200).send({msg: `'${blogPost.title}' successfully deleted!`})
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}

module.exports = {
    getAllBlogPosts,
    getBlogPostByID,
    createBlogPost,
    editBlogPost,
    deleteBlogPostByID
}