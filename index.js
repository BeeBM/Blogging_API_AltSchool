const express = require('express');
const BlogPostRouter = require('./Routes/blogPostRouter');
const AuthRouter = require('./Routes/authRouter');

const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());

app.use(express.json());

// Home Route
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Welcome to the World of Blogs!' })
})

// Routes
app.use('/blogposts', BlogPostRouter);
app.use('/',  AuthRouter);

// 404 Route
app.use('*', (req, res) => {
    return res.status(404).json({ message: 'Route not found' })
})

module.exports = app;