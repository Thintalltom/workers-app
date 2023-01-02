const mysql = require('mysql2')

const database = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'password',
    database: 'workersdb'
})

module.exports = database