const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',      // Replace with your MySQL host
    user: 'root',   // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: '' // Replace with your database name
})

// Check connection 
pool.getConnection((error, connection)=>{
    if(error){
        console.error(`Error connecting to the database:${err.stack}`)
        return
    }

    console.log(`Connected to the database with thread ID:${connection.threadId} `);

})
// Export the pool for use in other parts of the application

module.exports = pool.promise()  // '.promise()' enables promise-based APIs