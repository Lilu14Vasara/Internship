const express=require('express');
const app=express();
require('dotenv').config();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const pool = require('./db'); 


// const { name } = require('ejs');


app.set("view engine" ,"ejs");



app.get("/",(req,res)=>{
    res.render("formValidationCheck")
})


app.post('/submit-form', async (req, res) => {
    
    let conn; 
    
    try {
        conn = await pool.getConnection();
        await conn.beginTransaction(); 

        const b = req.body;
  
        const [basicResult] = await conn.execute(
            `INSERT INTO basic_details (first_name, last_name, designation, address1, email, address2, city, phone_number, state, gender, zip_code, relationsjip_status, birth_date) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [b.first, b.lastName, b.designation, b.address1, b.email, b.address2, b.city, b.phone_number, b.state, b.gender, b.zipCode, b.relation, b.date]
        );
        const applicantId = basicResult.insertId; 
        if (b.course) {
            const courses = Array.isArray(b.course) ? b.course : [b.course];//check if is an array if not then wrap inside array
            for (let i = 0; i < courses.length; i++) {
                await conn.execute(
                    `INSERT INTO education_details (applicant_id, course_name, passing_year, uni_board, result) VALUES (?, ?, ?, ?, ?)`,
                    [applicantId, courses[i], b.passingYear[i], b.board[i], b.percentage[i]]
                );
            }
        }

     
        if (b.companyName) {
            const companies = Array.isArray(b.companyName) ? b.companyName : [b.companyName];
            for (let i = 0; i < companies.length; i++) {
                await conn.execute(
                    `INSERT INTO work_experiences (applicant_id, company_name, from_date, to_date, annual_Package, reason_live, contact_number, ref_ct_Name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [applicantId, companies[i], b.fromDate[i], b.toDate[i], b.annualPackage[i], b.reasonTolive[i], b.contactNo[i], b.refCtName[i]]
                );
            }
        }

        const languages = ["Hindi", "English", "Gujrati"];
        for (let lang of languages) {
            if (b[lang]) { 
                await conn.execute(
                    `INSERT INTO language_knowns (language_id, applicant_id, language_name, can_read, can_write, can_speak) 
                     VALUES ((SELECT language_id FROM languages WHERE language_name = ?), ?, ?, ?, ?, ?)`,
                    [lang, applicantId, lang, b[`${lang}_Read`] ? 1 : 0, b[`${lang}_Write`] ? 1 : 0, b[`${lang}_Speak`] ? 1 : 0]
                );
            }
        }

    
        const techs = ["PHP", "Mysql", "larave", "Oracle"];
        for (let t of techs) {
            const checkedTechs = Array.isArray(b.tech_check) ? b.tech_check : [b.tech_check];
            if (checkedTechs.includes(t)) { 
                const level = b[t]; 
                await conn.execute(
                    `INSERT INTO technologies_knowns (applicant_id, technology_name, is_beginer, is_mideator, is_expert) 
                     VALUES (?, ?, ?, ?, ?)`,
                    [applicantId, t, level === 'Beginer' ? 1 : 0, level === 'Mideator' ? 1 : 0, level === 'Expert' ? 1 : 0]
                );
            }
        }

   
        if (b.refrenceName) {
            let names = Array.isArray(b.refrenceName) ? b.refrenceName : [b.refrenceName];
            let contacts = Array.isArray(b.refrenceCon) ? b.refrenceCon : [b.refrenceCon];
            let relations = Array.isArray(b.refrenceRel) ? b.refrenceRel : [b.refrenceRel];
            
            for (let i = 0; i < names.length; i++) {
                await conn.execute(
                    `INSERT INTO refrences (applicant_id, refrence_name, contact_number, relation) VALUES (?, ?, ?, ?)`,
                    [applicantId, names[i], contacts[i], relations[i]]
                );
            }
        }
     
        
        await conn.execute(
            `INSERT INTO preferances (applicant_id, preference_location, notice_period, expected_ctc, current_ctc, department) VALUES (?, ?, ?, ?, ?, ?)`,
            [applicantId, b.location, b.noticePeriod, b.expectedCtc, b.currentCtc, b.department]
        );

        await conn.commit(); 
        // res.redirect('/display/' + applicantId);
        res.redirect('/display/all')

    } catch (err) {
        if (conn) await conn.rollback(); 
        console.error(err);
        res.status(500).send("Error saving data: " + err.message);
    } finally {
        if (conn) conn.release(); 
    }
});

// app.get('/display/all',async(req,res)=>{
//     const [basic] = await pool.execute('SELECT * FROM basic_details');
//     res.render('basicDetails',{
//         basic
//     })
// })

//this routes for pagination
app.get("/display/all",async(req,res)=>{

     try {  let currentPage=parseInt(req.query.page)||1;
        let sort=req.query.sort||'applicant_id';
        let order=req.query.order||'ASC';

        const pageSize= parseInt(process.env.PAGE_LIMIT);

        const [result] = await pool.execute(`select count(*) as total from basic_details`);
      
        
        const totalDataSize=result[0].total;
         const totalPages=Math.ceil(totalDataSize/pageSize);
          currentPage = Math.min(currentPage, totalPages);
        let offset=(currentPage-1)*pageSize;

        const allowedSort=['applicant_id','first_name'];
        const allowedOrder=['ASC','DESC'];
        if (!allowedSort.includes(sort)) {
            sort='applicant_id';
        }
         if (!allowedOrder.includes(order)) {
            order='ASC';
        }
      const [basic] = await pool.execute(`SELECT * FROM basic_details ORDER BY ${sort} ${order} LIMIT ${pageSize} OFFSET ${offset} `);  
        res.render('basicDetails',{
           basic,
          currentPage,
            totalPages,
            sort,
            order
    }) ;
}catch(err){
    console.error(err);
    res.send("Error")
}
 });
 

app.get('/display/:id', async (req, res) => {
    const [basic] = await pool.execute('SELECT * FROM basic_details where applicant_id = ?', [req.params.id]);
    const [education] = await pool.execute('SELECT * FROM education_details WHERE applicant_id = ?', [req.params.id]);
    const[work]=await pool.execute('SELECT * FROM work_experiences WHERE applicant_id=?',[req.params.id]);
    const[languages]=await pool.execute('SELECT * FROM language_knowns where applicant_id=?',[req.params.id]);
    const[technology]=await pool.execute('SELECT * FROM technologies_knowns where applicant_id=?',[req.params.id]);
    const[refrence]=await pool.execute('SELECT * FROM refrences where applicant_id=?',[req.params.id]);
    const[preferance]=await pool.execute('SELECT * FROM preferances where applicant_id=?',[req.params.id]);
    
    res.render('formDataDisplay', { basic: basic[0],// basic,
                           education,
                           work,
                           languages,
                           technology,
                           refrence,
                           preferance
                        });
});
app.get('/edit/:id',async(req,res)=>{
   const id=req.params.id;
   const [basic] = await pool.execute('SELECT * FROM basic_details where applicant_id = ?', [req.params.id]);
    const [education] = await pool.execute('SELECT * FROM education_details WHERE applicant_id = ?', [req.params.id]);
    const[work]=await pool.execute('SELECT * FROM work_experiences WHERE applicant_id=?',[req.params.id]);
    const[languages]=await pool.execute('SELECT * FROM language_knowns where applicant_id=?',[req.params.id]);
    const[technology]=await pool.execute('SELECT * FROM technologies_knowns where applicant_id=?',[req.params.id]);
    const[refrence]=await pool.execute('SELECT * FROM refrences where applicant_id=?',[req.params.id]);
    const[preferance]=await pool.execute('SELECT * FROM preferances where applicant_id=?',[req.params.id]);
    res.render('basicDetailsInput',{
                        basic:basic[0],
                         education,
                           work,
                           languages,
                           technology,
                           refrence,
                           preferance
    });
});


    



 

   




//not using put because we sending data and updating it

app.post("/updateBasic/:id",async(req,res)=>{
    const conn = await pool.getConnection();
        await conn.beginTransaction(); 
    try {
        const applicantId=req.params.id;
         const b = req.body;

        let {  first, lastName, designation, address1, email, address2,  city, phone_number, state, gender, zipCode, relation, date } = req.body;
    const values = [
        first, lastName, designation, address1, email, 
        address2, city, phone_number, state, gender, 
        zipCode, relation, date, 
        applicantId
    ].map(val => val === undefined ? null : val); //we use async await because it taking too much time to execute query
    const[result]= await pool.execute(`Update basic_details  SET first_name=coalesce(?,first_name),last_name=coalesce(?,last_name),designation=coalesce(?,designation),
               address1=coalesce(?,address1),email=coalesce(?,email),address2=coalesce(?,address2),city=coalesce(?,city),phone_number=coalesce(?,phone_number),state=coalesce(?,state),gender=coalesce(?,gender),zip_code=coalesce(?,zip_code),relationsjip_status=coalesce(?,relationsjip_status)
               ,birth_date=coalesce(?,birth_date) where applicant_id=?`,
               values)
               
       
        await conn.execute(`DELETE FROM education_details WHERE applicant_id = ?`, [applicantId]);
        await conn.execute(`DELETE FROM work_experiences WHERE applicant_id = ?`, [applicantId]);
        await conn.execute(`DELETE FROM language_knowns WHERE applicant_id = ?`, [applicantId]);
        await conn.execute(`DELETE FROM technologies_knowns WHERE applicant_id = ?`, [applicantId]);
        await conn.execute(`DELETE FROM refrences WHERE applicant_id = ?`, [applicantId]);
        await conn.execute(`DELETE FROM preferances WHERE applicant_id = ?`, [applicantId]);
         

        if (b.course) {
            const courses = Array.isArray(b.course) ? b.course : [b.course];
            for (let i = 0; i < courses.length; i++) {
                await conn.execute(
                    `INSERT INTO education_details (applicant_id, course_name, passing_year, uni_board, result) VALUES (?, ?, ?, ?, ?)`,
                    [applicantId, courses[i], b.passingYear[i], b.board[i], b.percentage[i]]
                );
            }
        }

     
        if (b.companyName) {
            const companies = Array.isArray(b.companyName) ? b.companyName : [b.companyName];
            for (let i = 0; i < companies.length; i++) {
                await conn.execute(
                    `INSERT INTO work_experiences (applicant_id, company_name, from_date, to_date, annual_Package, reason_live, contact_number, ref_ct_Name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [applicantId, companies[i], b.fromDate[i], b.toDate[i], b.annualPackage[i], b.reasonTolive[i], b.contactNo[i], b.refCtName[i]]
                );
            }
        }

        const languages = ["Hindi", "English", "Gujrati"];
        for (let lang of languages) {
            if (b[lang]) { 
                await conn.execute(
                    `INSERT INTO language_knowns (language_id, applicant_id, language_name, can_read, can_write, can_speak) 
                     VALUES ((SELECT language_id FROM languages WHERE language_name = ?), ?, ?, ?, ?, ?)`,
                    [lang, applicantId, lang, b[`${lang}_Read`] ? 1 : 0, b[`${lang}_Write`] ? 1 : 0, b[`${lang}_Speak`] ? 1 : 0]
                );
            }
        }

    
        const techs = ["PHP", "Mysql", "larave", "Oracle"];
        for (let t of techs) {
            const checkedTechs = Array.isArray(b.tech_check) ? b.tech_check : [b.tech_check];
            if (checkedTechs.includes(t)) { 
                const level = b[t]; 
                await conn.execute(
                    `INSERT INTO technologies_knowns (applicant_id, technology_name, is_beginer, is_mideator, is_expert) 
                     VALUES (?, ?, ?, ?, ?)`,
                    [applicantId, t, level === 'Beginer' ? 1 : 0, level === 'Mideator' ? 1 : 0, level === 'Expert' ? 1 : 0]
                );
            }
        }

   
        if (b.refrenceName) {
            let names = Array.isArray(b.refrenceName) ? b.refrenceName : [b.refrenceName];
            let contacts = Array.isArray(b.refrenceCon) ? b.refrenceCon : [b.refrenceCon];
            let relations = Array.isArray(b.refrenceRel) ? b.refrenceRel : [b.refrenceRel];
            
            for (let i = 0; i < names.length; i++) {
                await conn.execute(
                    `INSERT INTO refrences (applicant_id, refrence_name, contact_number, relation) VALUES (?, ?, ?, ?)`,
                    [applicantId, names[i], contacts[i], relations[i]]
                );
            }
        }
     
        
        await conn.execute(
            `INSERT INTO preferances (applicant_id, preference_location, notice_period, expected_ctc, current_ctc, department) VALUES (?, ?, ?, ?, ?, ?)`,
            [applicantId, b.location, b.noticePeriod, b.expectedCtc, b.currentCtc, b.department]
        );

        await conn.commit(); 
             conn.release();
             res.send("Data Updated Successfully")
               
    } catch (error) {
        if (conn) await conn.rollback(); 
        conn.release();
        console.log(error);
        res.send("Error in Updating")
        
    }
    
})

//write get because of deleting from form Data
app.get("/deleteBasic/:id",async(req,res)=>{
    const conn = await pool.getConnection();
        await conn.beginTransaction(); 
    try {
        const applicantId=req.params.id;
         const b = req.body;
             
      await  Promise.all([
         conn.execute(`DELETE FROM education_details WHERE applicant_id = ?`, [applicantId]),
         conn.execute(`DELETE FROM work_experiences WHERE applicant_id = ?`, [applicantId]),
         conn.execute(`DELETE FROM language_knowns WHERE applicant_id = ?`, [applicantId]),
         conn.execute(`DELETE FROM technologies_knowns WHERE applicant_id = ?`, [applicantId]),
         conn.execute(`DELETE FROM refrences WHERE applicant_id = ?`, [applicantId]),
         conn.execute(`DELETE FROM preferances WHERE applicant_id = ?`, [applicantId]),
     ]);
         
        await conn.execute(`DELETE FROM basic_details where applicant_id=?`,[applicantId]);
        
        await conn.commit(); 
             conn.release();
             res.send("Data Deleted Successfully")
               
    } catch (error) {
        await pool.rollback();
        conn.release();
        console.log(error);
        res.send("Error in Deleting")
        
    }
})


app.listen(4795,()=>{
    console.log(`Server is Running on 4795`);
    
});
// app.listen(process.env.PORT ||3000,()=>{
//     console.log(`Server is Running on ${process.env.PORT}`);
    
// })


 
