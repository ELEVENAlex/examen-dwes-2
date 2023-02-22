const pool = require('mysql2/promise')
require('dotenv').config()

module.exports= pool.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

