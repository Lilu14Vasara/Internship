const sql=require('mysql2');

const connection=sql.createConnection({
    host:"localhost",
    user:"root",
    password:"Dev@123",
    database:"student_details"
    
});

connection.connect((err)=>{
  if (err) {
    console.log("Error in connecting");
    return;
    
  }
  console.log("Database Connected Successfully")
})

module.exports=connection;