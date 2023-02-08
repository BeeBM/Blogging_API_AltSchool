const BlogPostModel = require('../Models/blogPostModel');
const readingTime = require('reading-time');

//Get all the BlogPosts
async function getAllBlogPosts(req, res) {
    const { query } = req;
    const {
        author, 
        title, 
        tags, 
        read_count,
        reading_time,
        blogPost,
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
    const sortAttributes = order_by.split(',');

    for (const attribute of sortAttributes) {
        let sortOrder = 1;
        switch (blogPost) {
            case 'asc':
                sortOrder = 1;
                break;
            case 'desc':
                sortOrder = -1;
                break;
        }
        sortQuery[attribute] = sortOrder;
    }

    const blogPosts = await BlogPostModel
        .find({state: { $eq: 'published' }})
        .find(findQuery)
        .sort(sortQuery)
        .skip((page - 1) * per_page)
        .limit(per_page);

    return res.status(200).json({ status: true, blogPosts });
}

//Get a Particular BlogPost
const getBlogPostByID = async (req, res) => {
    const id = req.params.id;

    const blogPost = await BlogPostModel.findOne({ _id: id });
    if (!blogPost) {
        return res.status(404).send('Blog post not found');
    }
    blogPost.read_count++;

    await blogPost.save();
    return res.status(200).send({blogPost, status: true});
}

//Create a BlogPost
const createBlogPost = async (req, res) => {
    const body = req.body;
    const {firstname, lastname, email} = req.blogger;
    const readTime = await readingTime(req.body.blogPostBody);
    const author = `${firstname} ${lastname} ${email}`;
    const readCount = 0;

    try {
        const NewBlogPost = await BlogPostModel.create({
            ...body,
            author,
            read_count: readCount,
            reading_time: readTime.text,
        });
        return res.json({ status: true, NewBlogPost })
    } catch(err) {
        return res.json({status: false, error: err}) 
    }
};

//Get all Personal BlogPosts
const getOwnBlogPosts = async (req, res) => {
    const {firstname, lastname, email} = req.blogger;
    const author = `${firstname} ${lastname} ${email}`;
    const { query } = req;

    const { 
        state,
        page = 1, 
        per_page = 20 
    } = query; 

    const findQuery = {};

    if (state) {
        findQuery.state = state;
    } 

    const newBlogPosts = await BlogPostModel.find(
        { author: { $eq: author } },
        { state: 1, page: 1, per_page: 1 }
    );

    return res.status(200).json({ status: true, newBlogPosts })
}

//Get a Particular Personal BlogPost 
const getOwnBlogPostByID = async (req, res) => {
    const {firstname, lastname, email} = req.blogger;
    const author = `${firstname} ${lastname} ${email}`;

    const id = req.params.id

    const blogPost = await BlogPostModel.findById(id)
    .find({author: { $eq: author }})
    blogPost.read_count++

    await blogPost.save()

        .then(blogPost => {
            res.status(200).send(blogPost)
        }).catch(err => {
            res.status(404).send(err)
        })
}

//Edit detail(s) of a BlogPost
const editBlogPost = async (req, res) => {
    const id = req.params.id;
    const blogPost = await BlogPostModel.findById(id);
    const {email} = req.blogger;
    
    if (blogPost && (blogPost.author.split(' ')[2] === email)) {
        const blogPost = req.body;
        blogPost.lastUpdateAt = new Date() // set the lastUpdateAt to the current date
        BlogPostModel.findByIdAndUpdate(id, blogPost, { new: true })
            .then(editedBlogPost => {
                res.status(200).send(editedBlogPost)
            }).catch(err => {
                res.status(500).send(err)
            })
    } else {
        res.status(401).send({message: 'You are not authorized to edit this Blog post or blogpost does not exist'})
    } 
}

//Delete a BlogPost
const deleteBlogPost = async (req, res) => {
    const id = req.params.id
    const blogPost = await BlogPostModel.findById(id);
    const {email} = req.blogger;

    if (blogPost && (blogPost.author.split(' ')[2] === email)) {
        BlogPostModel.findByIdAndRemove(id)
            .then(blogPost => {
                res.status(200).send({msg: `'${blogPost.title}' successfully deleted!`})
            }).catch(err => {
                res.status(500).send(err)
            })
    } else {
        res.status(401).send({message: 'You are not authorized to delete this Blog post or blogpost does not exist'})
    }

}

module.exports = {
    getAllBlogPosts,
    getBlogPostByID,
    createBlogPost,
    getOwnBlogPosts,
    getOwnBlogPostByID,
    editBlogPost,
    deleteBlogPost
}