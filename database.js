const pool = require('mysql2/promise')
require('dotenv').config()

if(process.env.NODE_ENV==='develop'){
    module.exports= pool.createPool({
        host: process.env.DEVELOPHOST,
        user: process.env.DEVELOPUSER,
        port: process.env.DEVELOPPORT,
        password: process.env.DEVELOPPASSWORD,
        database: process.env.DEVELOPDATABASE
    })
} else {
    module.exports= pool.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    })
}
