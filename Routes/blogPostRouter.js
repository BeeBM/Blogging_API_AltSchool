const express = require('express');
const BlogPostController = require('../Controllers/blogPostController');

const blogPostRouter = express.Router();

blogRouter.get('/', BlogPostController.getAllBlogPosts);

blogRouter.get('/:Id', BlogPostController.getBlogPostByID)

blogRouter.post('/', BlogPostController.createBlogPost)

blogRouter.patch('/:id', BlogPostController.updateBlogPost)

blogRouter.delete('/:id', BlogPostController.deleteBlogPostByID)


module.exports = blogPostRouter;