const express =require('express');
const app=express();
const pool=require('./db')
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");


app.get("/",async(req,res)=>{
    const [basic] = await pool.execute(`select  masters.m_id ,field_type,field_name,option_value,option_label,option_idf 
from masters
inner join master_options
on masters.m_id=master_options.m_id `);

                                      
    res.render("first",{
               basic
    })
})



app.listen(process.env.PORT||5000,()=>{
    console.log(`Server started At Port ${process.env.PORT}`);
    });


