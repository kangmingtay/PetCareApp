const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

let pool;

if (process.env.NODE_ENV === 'development') {
    pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
    });
}

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Database setup complete...');
    release();
    
})

module.exports = pool;