const app = require('./index');
const Database = require('./Database/mongoDb');
const CONFIG = require('./Config/config');

// connect to database
Database.connectToDb();

app.listen(CONFIG.PORT, () => {
    console.log(`Server started on http://localhost:${CONFIG.PORT}`)
})