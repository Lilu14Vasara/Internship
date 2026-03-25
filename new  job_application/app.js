const express =require('express');
const app=express();
const pool=require('./db')
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");


app.get("/combobox",async(req,res)=>{
const [basic] = await pool.execute(`select  masters.m_id ,
field_type,field_name,option_value
from masters
inner join master_options
on masters.m_id=master_options.m_id `);

let grouped={};
basic.forEach(row=>{
    // console.log(row);
 if (!grouped[row.m_id]) {
      grouped[row.m_id]={
        field_type:row.field_type,
        field_name:row.field_name,
        options:[]
      }
 }
grouped[row.m_id].options.push({
    value:row.option_value,
}); 

});
    //  console.log(grouped);
                                      
//   res.render("first",{
//             fields:Object.values(grouped)
//     });
    res.send({fields:Object.values(grouped)})
})
app.get("/",(req,res)=>{
    res.render("basicDetails")
})
app.listen(process.env.PORT||5000,()=>{
    console.log(`Server started At Port ${process.env.PORT}`);
    });


 
