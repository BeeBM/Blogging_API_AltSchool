const express = require('express');
const BlogPostController = require('../Controllers/blogPostController');
const authorization = require('../utils/authorization');
const checkBodyContains = require('../utils/validation');

const blogPostRouter = express.Router();

blogPostRouter.get('/', BlogPostController.getAllBlogPosts); 

blogPostRouter.get('/:id', BlogPostController.getBlogPostByID)

blogPostRouter.post('/', authorization, checkBodyContains('title', 'description', 'blogPostBody'), BlogPostController.createBlogPost)

blogPostRouter.get('/myposts', authorization, BlogPostController.getOwnBlogPosts);

blogPostRouter.get('/myposts:id', authorization, BlogPostController.getOwnBlogPostByID);

blogPostRouter.patch('/:id', authorization, BlogPostController.editBlogPost)

blogPostRouter.delete('/:id', authorization, BlogPostController.deleteBlogPost)


module.exports = blogPostRouter;  