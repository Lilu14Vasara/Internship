const express=require("express");
const app=express();
const db=require('./dbPage');

app.set("view engine","ejs");
app.use(express.json())
require('dotenv').config();


db.query(`select count(*) as total from student`,(err,result)=>{
    if (err) {
        console.log("Error in counting student records");
        return;
    }
    const totalDataSize=result[0].total;

    const pageSize= parseInt(process.env.PAGE_LIMIT);

    const totalPages=Math.ceil(totalDataSize/pageSize);

 
app.get("/",(req,res)=>{

        let currentPage=parseInt(req.query.page)||1;
        let sort=req.query.sort||'student_id';
        let order=req.query.order||'ASC';
        let search=req.query.search||"";
        let operators=req.query.oprator||'AND'
     
        currentPage = Math.min(currentPage, totalPages);

        let offset=(currentPage-1)*pageSize;
               
let regularExpression=/([$\^\-\[\]])([^\$\^\-\[\]]+)/g;
const match=[...search.matchAll(regularExpression)];//first in symbol,second in value


let condition=[];
let params=[];
if(match.length>0)
{
    for(m of match){
    const symbol=m[1];
    const value=m[2]||"";

    if(symbol==="$"){
        condition.push("first_name LIKE ?");
        params.push(`%${value}%`)
    }
    else if(symbol==="^"){
        condition.push("last_name LIKE ?");
        params.push(`%${value}%`);
    }
    else if(symbol==="-"){
        condition.push("contact_number LIKE ?");
        params.push(`%${value}%`);
    }
    else if(symbol==="["){
      condition.push("email LIKE ?");
      params.push(`%${value}%`)
    }
    else if(symbol==="]"){
        condition.push("city LIKE ?");
        params.push(`%${value}%`)
    }
    console.log(symbol);
    console.log(value);
 
    
    
    }
 
    db.query(`select count(*) as total from student  where ${condition.join(` ${operators} `)}`,[...params],(err,result)=>{
        if (err) {
            console.log(err);
            return res.send(err);
            
        }
     const totalDataSize=result[0].total;  
     const pageSize= parseInt(process.env.PAGE_LIMIT);

     const totalPages=Math.ceil(totalDataSize/pageSize);  
    
           console.log(result[0].total);
        
     let sql=`SELECT * From student where ${condition.join(` ${operators} `)}  order by ${sort} ${order} LIMIT ? OFFSET ?`;//write AND, OR INSTEAD Of oprator
    let finalParams=[...params,pageSize,offset] //writing params because of multiple items in array like we write first name and last name
    db.query(sql,finalParams,(err,result)=>{


        res.render("paginationContext",{
            student:result,
            currentPage,
            totalPages,
            sort,
            order,
            search,
            operators
        })
    });
  });
               
    
   
    
} 
else{
    let value=`%${search}%`;
    let sql=`SELECT * FROM student where first_name LIKE ? OR last_name LIKE ? OR contact_number Like ? OR email LIKE ? OR city LIKE? order by ${sort} ${order} LIMIT ? OFFSET ?`;
    db.query(sql,[value,value,value,value,value,pageSize,offset],(err,result)=>{
         if (err) {
            console.log("Error In fetching Data")
            return res.send("Database Error");
        }
        res.render("paginationContext",{
            student:result,
            currentPage,
            totalPages,
            sort,
            order,
            search,
            operators
        });
    })
}


    //     let query=`SELECT * From student where first_name  like ? order by ${sort} ${order} LIMIT ? OFFSET ?`;//?  replace with search field ,pageSize,offset and % for marching value from starting middle ending
    //  db.query(query,[`%${search}%`,pageSize,offset],(err,results)=>{
    //     if (err) {
    //         console.log("Error In fetching Data")
    //         return res.send("Database Error");
    //     }
    
    //     res.render("paginationContext",{
    //         student:results,
    //         currentPage,
    //         totalPages,
    //         sort,
    //         order,
    //         search
    //     });
    // });
   
});

});

app.get("/:id",(req,res)=>{
    let id=(req.params.id)

    db.query(`SELECT * FROM student WHERE student_id=?`,[id],(err,result)=>{
        if (err) {
             console.error(err);
            return res.send("Error in Fetching data")
        }
     if (result.length==0) {
        res.status(404).send("Student Not Found")
    }
        res.send(result[0]);
    });
});

app.post("/student",(req,res)=>{
    let { first_name,  last_name, email,contact_number,address,birth_date,gender,city }=req.body

    db.query(`INSERT INTO student(first_name,last_name,email,contact_number,address,birth_date,gender,city) VALUES(?,?,?,?,?,?,?,?)`,[first_name,last_name,email,contact_number,address,birth_date,gender,city],(err,result)=>{
        if (err) {
            console.error(err);
           return res.status(500).send("Error in sending data");
        }
        res.send("Student Added Successfully");
    })
});


app.put("/student/:id",(req,res)=>{
let id=req.params.id;

console.log("Updating ID:", id);
if (!id || id === 'undefined') {
        return res.status(400).send("Student ID is missing or invalid");
    }



 let { first_name,  last_name, email,contact_number,address,birth_date,gender,city }=req.body

db.query(`UPDATE student SET first_name=coalesce(?,first_name),last_name=coalesce(?,last_name),email=coalesce(?,email),contact_number=coalesce(?,contact_number),address=coalesce(?,address),
    birth_date=coalesce(?,birth_date),gender=coalesce(?,gender),city=coalesce(?,city) where student_id=?`,[first_name,last_name,email,contact_number,address,birth_date,gender,city,id],(err,result)=>{

        if (err){
            console.log(err);    
         return res.send("Error in Updating Data")
        }
        res.send("Updated Successfully");
    })
});


app.delete("/student/:id",(req,res)=>{
     let id=req.params.id;

     
     db.query(`DELETE FROM student WHERE student_id=?`,[id],(err,result)=>{
        if (err) {
            console.log(err);
            
            return res.send("Error in deleting Student Data")
        }
        res.send("Deleted Succesfully")
     })
})

app.listen(5000,()=>{
    console.log("Server is Running At port 5000")
}) 
