let id1=document.getElementById("1");
let id2=document.getElementById("2");
let id3=document.getElementById("3");
let id4=document.getElementById("4");
let id5=document.getElementById("5");
let id6=document.getElementById("6");
let id7=document.getElementById("7");
let id8=document.getElementById("8");
let id9=document.getElementById("9");
let id10=document.getElementById("10");
let id11=document.getElementById("11");
let id12=document.getElementById("12");
const target = document.querySelector("#cell-13 div");
let id14=document.getElementById("14");
let id15=document.getElementById("15");
let id16=document.getElementById("16");
let id17=document.getElementById("17");
let id18=document.getElementById("18")
console.log(id18);

let id19=document.getElementById("19");
let id20=document.getElementById("20");
let id21=document.getElementById("21");




id1.addEventListener("click",()=>{
    alert("Click Event Occurs")
})
id2.addEventListener("dblclick",()=>{
   alert("Doble Click Event Occurs")
})
id3.addEventListener("mouseover",()=>{
    alert("Mouse Over Event Occurs")

})
id4.addEventListener("mousedown",()=>{
    alert("Mouse Down Event Occurs")
})//occurs immediately when user press mouse button

id5.addEventListener("mouseup",()=>{
    alert("Mouse up Event Occurs")
})//Occurs when the user releases the mouse button

id6.addEventListener("mousemove",()=>{
    alert("Mouse move Event Occurs")
})


// id8.addEventListener("DOMContentLoaded",()=>{
//     alert("DomcontentLoaded event occurs from cell 8")
// })

id9.addEventListener("load",()=>{
    alert("Load event occurs")
})
id7.addEventListener("keydown",(e)=>{
   alert(`${e.key} pressed`)
})//trigger immediately after press work on all key

id8.addEventListener("keyup",(e)=>{
   alert(`${e.key} pressed`)
})//trigger when we release the key ,if we continuesly press key then las element press


id10.addEventListener("change",(e)=>{
    alert(` You Write ${e.target.value}`)//occured when we change the field and click outside something 
})
id11.addEventListener("blur",()=>{
    alert("Blur event Occured ")
}) //occured when we touch the field and click outside something 

id12.addEventListener("copy",()=>{
    alert("Copy Event Occured ")
})



target.addEventListener("scroll", () => {
    document.getElementById("demo").innerHTML = "You scrolled in div.";
    // alert("You Scrolled in Cell")
});//if we not go from starting in scrollbar than it is continue run when we refresh the page


id14.addEventListener("focus",()=>{
    alert("Focused on Cell")
})//not create bubbling from child to parent

id15.addEventListener("focusout",()=>{
    alert("Focus Out")
})

id16.addEventListener("keypress",(e)=>{
    alert(`key pressed is ${e.key}`) //key pressed triggers immediately not work on non-character key
})
id17.addEventListener("contextmenu",()=>{
    alert("Context menu open")
})

id18.addEventListener("focusin",()=>{
    alert("Focus in Event Triggered")
})//create bubbling

id19.addEventListener("drag", () => {
    alert("You started dragging!"); // This only fires ONCE at the beginning.
});
id20.addEventListener("dragend",()=>{
 alert("You ended dragging!");
})

id21.addEventListener("touchend",()=>{
  alert("You toched cell!");
})
