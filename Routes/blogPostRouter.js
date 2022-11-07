const express = require('express');
const BlogPostController = require('../Controllers/blogPostController');
const authorization = require('../Utils/authorization');
const checkBodyContains = require('../Utils/validation');

const blogPostRouter = express.Router();

blogPostRouter.get('/', BlogPostController.getAllBlogPosts); 

blogPostRouter.get('/:id', BlogPostController.getBlogPostByID)

blogPostRouter.post('/', authorization, checkBodyContains('title', 'description', 'blogPostBody'), BlogPostController.createBlogPost)

blogPostRouter.get('/', authorization, BlogPostController.getOwnBlogPosts);

blogPostRouter.get('/:id', authorization, BlogPostController.getOwnBlogPostByID);

blogPostRouter.patch('/:id', authorization, BlogPostController.editBlogPost)

blogPostRouter.delete('/:id', authorization, BlogPostController.deleteBlogPost)


module.exports = blogPostRouter;  