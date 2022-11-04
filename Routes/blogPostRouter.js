const express = require('express');
const BlogPostController = require('../Controllers/blogPostController');

const blogPostRouter = express.Router();

blogPostRouter.get('/', BlogPostController.getAllBlogPosts);

blogPostRouter.get('/:id', BlogPostController.getBlogPostByID)

blogPostRouter.post('/', BlogPostController.createBlogPost)

blogPostRouter.patch('/:id', BlogPostController.editBlogPost)

blogPostRouter.delete('/:id', BlogPostController.deleteBlogPostByID)


module.exports = blogPostRouter;