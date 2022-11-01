const express = require('express');
const Database = require('./Database/mongoDb');

const CONFIG = require('./Config/config');

const app = express()

// connect to database
Database.connectToDb();

// home route
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Welcome to the World of Blogs!' })
})

// 404 route
app.use('*', (req, res) => {
    return res.status(404).json({ message: 'Route not found' })
})

app.listen(CONFIG.PORT, () => {
    console.log(`Server started on http://localhost:${CONFIG.PORT}`)
})