const mysql=require('mysql2/promise');

const pool=mysql.createPool({
    host:"localhost",
    user:"root",
    database:"job_application_master",
    password:"Dev@123"
})

pool.getConnection()
.then(conn=>{
    console.log("Database Connected Successfully");
    conn.release();
})
.catch(err=>{
    console.log("Error in connecting",err.message);
    
})

module.exports=pool;