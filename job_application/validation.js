const validationForm=(req,res,next)=>{
    const b=req.body;
    let errors={};

    let emailPattern=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
   let mobilePattern=/[0-9]{10}/;
   
   
  
      if (!b.first||b.first.trim()=="") {
          errors.first="First Name is Require";
      }
    
      if (!b.lastName||b.lastName.trim()=="") {
           errors.lastName="Last Name is Require";
      }
      if (!b.designation||b.designation.trim()=="") {
           errors.designation="designation is Require";
      }
      if(!b.address1||b.address1.trim()==""){
        errors.address1="Address is Require";
      }
      if (!b.email||emailPattern.test(email)||b.email.trim()=="") {
        errors.email="Correct Email is Require"
      }
      if (!b.city||b.city.trim()=="") {
        errors.city="City is Require "
      }
    if (!b.phone_number||mobilePattern.test(phone_number)||b.phone_number.trim()=="") {
        errors.phone_number="Correct Phone Number Is Require";
    }
    if (!b.state) {
        errors.state="State is require";
    }
    if (!b.male.checked && !b.female.checked) {
        errors.gender="please select gender";
    }
    if (!b.zipcode||b.zipcode.trim()) {
        errors.zipcode="Zipcode is require";
    }
    if (!b.relation) {
        errors.relation="Relationship status require"
    }
    if (!b.date) {
        errors.date="Birth Date is Require"
    }
      



  if (!b.course) {
    errors.course="Course is Require"
  }
  if (!b.passingYear||b.passingYear.trim()) {
    errors.passingYear="Passing Year is Require"
  }
  if (!b.board||b.board.trim()) {
    errors.board="Board or Uni. Require"
  }
  if (!b.percentage||b.percentage.trim()) {
    errors.percentage="Percentage is Require"
  }



    if (!b.companyName||b.companyName.trim()) {
    errors.companyName="Company name is Require"
  }
    if (!b.refCtName||b.refCtName.trim()) {
    errors.refCtName="refCtName is Require"
  }
    if (!b.contactNo||b.contactNo.trim()) {
    errors.contactNo="Contact no is Require"
  }
    if (!b.reasonTolive||b.reasonTolive.trim()) {
    errors.reasonTolive="Reason to live is Require"
  }
    if (!b.annualPackage) {
    errors.annualPackage="Annual Package  is Require"
  }
    if (!b.fromDate) {
    errors.fromDate="From Date is Require"
  }
    if (!b.toDate) {
    errors.fromDate="To Date is Require"
  }



  if (!b.refrenceName||b.refrenceName.trim()=="") {
    errors.refrenceName="Refrence Name is Require";
  }
   if (!b.refrenceCon||b.refrenceCon.trim()=="") {
    errors.refrenceCon="Refrence Number is Require";
  }
   if (!b.refrenceRel||b.refrenceRel.trim()=="") {
    errors.refrenceRel="Refrence Relation is Require";
  }





    if (!b.location) {
        errors.location="Preferd location is Require";
    }
     if (!b.noticePeriod||b.noticePeriod.trim()=="") {
    errors.noticePeriod="Notice Period is Require";
  }
     if (!b.expectedCtc) {
    errors.refrenceRel="Expected CTC is Require";
  }
     if (!b.currentCtc) {
    errors.refrenceRel="Current CTC is Require";
  }
  if (!b.department) {
    errors.department="Department is Require";
  }

if (Object.keys(errors.length>0))
{
    res.status(400).json({errors});

}
    
 next()
}

export default validationForm;
