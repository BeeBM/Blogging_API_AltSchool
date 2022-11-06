const request = require('supertest');
const { connect } = require('./database');
const BloggerModel = require('../Models/bloggerModel');
const app = require('../index');

describe('Auth: Signup', () => {
    let conn;

    beforeAll(async () => {
        conn = await connect()
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should signup a user', async () => {
        const response = await request(app).post('/signup')
        .set('content-type', 'application/json')
        .send({ 
            username: 'BiBe', 
            password: 'Pword123', 
            firstName: 'BiOluwatife',
            lastName: 'Bee',
            email: 'beeb@mail.com'
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('username', 'BiBe')
        expect(response.body.user).toHaveProperty('firstname', 'BiOluwatife')
        expect(response.body.user).toHaveProperty('lastname', 'Bee')
        expect(response.body.user).toHaveProperty('email', 'beeb@mail.com')        
    })


    it('should login a user', async () => {
        // create bloggers in our database
        const user = await BloggerModel.create({ username: 'BiBe', password: 'Pword123'});

        // log in a blogger
        const response = await request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({ 
            username: 'BiBe', 
            password: 'Pword123'
        });
    

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')      
    })
})