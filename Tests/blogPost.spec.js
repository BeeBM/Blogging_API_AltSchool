const request = require('supertest');
const { connect } = require('./database');
const app = require('../index');
const moment = require('moment');
const BlogPostModel = require('../Models/blogPostModel');
const BloggerModel = require('../Models/bloggerModel');


describe('Blogger Route', () => {
    let conn;
    let token;

    beforeAll(async () => {
        conn = await connect()

        await BloggerModel.create({ firstname: "Boluwatife", lastname: "BeeB", email: "beeb@gmail.com", username: 'Bibe', password: 'Pword123'});

        const loginResponse = await request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({ 
            username: 'Bibe', 
            password: 'Pword123'
        });

        token = loginResponse.body.token;
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should return blogPosts', async () => {
        // create blogPosts in our db
        await BlogPostModel.create({
            title: 'The Old shall lead.',
            description: 'The Old shall lead by wisdom.',
            author: 'Older Young',
            state: 'draft',
            tags: [
                'Old',
                'Lead',
                'Young'
            ],
            blogPostBody: 'Replit, and programming in general, just took a huge leap forward. No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. In all seriousness, the Repit Mobile app is a new, enjoyable approach to programming on mobile The Replit Mobile app is available on Android and iOS. If you’d like to learn more about features like the coding joystick and smart suggestion, you’ll find every unique mobile feature here.',
            createAt: moment().toDate(),
            lastUpdateAt: moment().toDate(),
            read_count: 0
        })

        await BlogPostModel.create({
            title: 'The Young shall lead.',
            description: 'The young shall lead by maturity.',
            author: 'Older Young',
            state: 'draft',
            tags: [
                'Old',
                'Lead',
                'Young'
            ],
            blogPostBody: 'Replit, and programming in general, just took a huge leap forward. No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. In all seriousness, the Repit Mobile app is a new, enjoyable approach to programming on mobile The Replit Mobile app is available on Android and iOS. If you’d like to learn more about features like the coding joystick and smart suggestion, you’ll find every unique mobile feature here.',
            createAt: moment().toDate(),
            lastUpdateAt: moment().toDate(),
            read_count: 0
        })

        const response = await request(app)
        .get('/blogPosts')
        .set('content-type', 'application/json')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blogPosts')
        expect(response.body).toHaveProperty('status', true)
    })

    it('should return a blogPost', async () => {
        // create blogPosts in our db
        await BlogPostModel.create({
            title: 'The Old shall lead.',
            description: 'The Old shall lead by wisdom.',
            author: 'Older Young',
            state: 'draft',
            tags: [
                'Old',
                'Lead',
                'Young'
            ],
            blogPostBody: 'Replit, and programming in general, just took a huge leap forward. No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. In all seriousness, the Repit Mobile app is a new, enjoyable approach to programming on mobile The Replit Mobile app is available on Android and iOS. If you’d like to learn more about features like the coding joystick and smart suggestion, you’ll find every unique mobile feature here.',
            createAt: moment().toDate(),
            lastUpdateAt: moment().toDate(),
            read_count: 0
        })

        const createdBlogPost = await BlogPostModel.create({
            title: 'The Young shall lead.',
            description: 'The Old shall lead by maturity.',
            author: 'Older Young',
            state: 'draft',
            tags: [
                'Old',
                'Lead',
                'Young'
            ],
            blogPostBody: 'Replit, and programming in general, just took a huge leap forward. No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. In all seriousness, the Repit Mobile app is a new, enjoyable approach to programming on mobile The Replit Mobile app is available on Android and iOS. If you’d like to learn more about features like the coding joystick and smart suggestion, you’ll find every unique mobile feature here.',
            createAt: moment().toDate(),
            lastUpdateAt: moment().toDate(),
            read_count: 0
        })

        const response = await request(app)
        .get(`/blogPosts/${createdBlogPost._id}`)
        .set('content-type', 'application/json')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blogPost')
        expect(response.body).toHaveProperty('status', true)
    })

    it('should edit a blogPost', async () => {
        // create blogPosts in our db
        await BlogPostModel.create({
            title: 'The Young shall lead.',
            description: 'The Old shall lead by maturity.',
            author: 'Older Young',
            state: 'draft',
            tags: [
                'Old',
                'Lead',
                'Young'
            ],
            blogPostBody: 'Replit, and programming in general, just took a huge leap forward. No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. In all seriousness, the Repit Mobile app is a new, enjoyable approach to programming on mobile The Replit Mobile app is available on Android and iOS. If you’d like to learn more about features like the coding joystick and smart suggestion, you’ll find every unique mobile feature here.',
            createAt: moment().toDate(),
            lastUpdateAt: moment().toDate(),
            read_count: 0
        })

        const editedBlogPost = await BlogPostModel.findByIdAndUpdate({
            title: 'The Young shall lead us well.',
            author: 'Older Young',
            state: 'published',
            tags: [
                'Old',
                'Lead',
                'Young'
            ],
            blogPostBody: 'No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. In all seriousness, the Repit Mobile app is a new, enjoyable approach to programming on mobile The Replit Mobile app is available on Android and iOS. If you’d like to learn more about features like the coding joystick and smart suggestion, you’ll find every unique mobile feature here.',
            createAt: moment().toDate(),
            lastUpdateAt: moment().toDate(),
            read_count: 0
        })

        const response = await request(app)
        .get(`/blogPosts/${editedBlogPost._id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blogPost')
        expect(response.body).toHaveProperty('status', true)
    })

    it('should delete a blogPost', async () => {
        // create blogPosts in our db
        await BlogPostModel.create({
            title: 'The Young shall lead.',
            description: 'The Old shall lead by maturity.',
            author: 'Older Young',
            state: 'draft',
            tags: [
                'Old',
                'Lead',
                'Young'
            ],
            blogPostBody: 'Replit, and programming in general, just took a huge leap forward. No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. In all seriousness, the Repit Mobile app is a new, enjoyable approach to programming on mobile The Replit Mobile app is available on Android and iOS. If you’d like to learn more about features like the coding joystick and smart suggestion, you’ll find every unique mobile feature here.',
            createAt: moment().toDate(),
            lastUpdateAt: moment().toDate(),
            read_count: 0
        })

        const deletedBlogPost = await BlogPostModel.findByIdAndDelete({
            title: 'The Young shall lead us well.',
            author: 'Older Young',
            state: 'published',
            tags: [
                'Old',
                'Lead',
                'Young'
            ],
            blogPostBody: 'No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. In all seriousness, the Repit Mobile app is a new, enjoyable approach to programming on mobile The Replit Mobile app is available on Android and iOS. If you’d like to learn more about features like the coding joystick and smart suggestion, you’ll find every unique mobile feature here.',
            createAt: moment().toDate(),
            lastUpdateAt: moment().toDate(),
            read_count: 0
        })

        const response = await request(app)
        .get(`/blogPosts/${deletedBlogPost._id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: `'${blogPost.title}' successfully deleted!`})
        expect(response.body).toHaveProperty('status', true)
    })
});
