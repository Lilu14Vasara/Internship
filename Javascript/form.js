let firstName=document.getElementById('fname').value;

let submit=document.getElementById('submit');

submit.addEventListener('click',(e)=>{
    e.preventDefault();

    alert(`Hello ${firstName}`)

})