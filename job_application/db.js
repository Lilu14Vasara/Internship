// const mysql=require('mysql2');

// const pool=mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     database:"job_application",
//     password:"Dev@123"
// })

// pool.connect((err)=>{

//     if (err) {
//         console.log("Error In Connecting Database");       
//     }

//     console.log("Database Connected Successfully")
// })

// module.exports=pool;

const mysql = require('mysql2/promise'); 

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "job_application",
    password: "Dev@123",
    waitForConnections: true,
    connectionLimit: 10
});


pool.getConnection()
    .then(conn => {
        console.log("Database Connected Successfully");
        conn.release();
    })
    .catch(err => {
        console.log("Error In Connecting Database:", err.message);
    });

module.exports = pool;
