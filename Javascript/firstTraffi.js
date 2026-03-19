var tds=document.getElementsByTagName('td')
var green=[];
var red=[];
var yellow=[]

for (let i = 0; i < tds.length; i++) {
    if(tds[i].id==="colorG"){
        green.push(tds[i])
    }
      if(tds[i].id==="colorR"){
        red.push(tds[i])
    }
      if(tds[i].id==="colorY"){
        yellow.push(tds[i])
    }
}
var colors=[green,red,yellow]

let colorIndex=0;
let lightColor=0;


// forgot to write green.length
function dimLights() {
    for (let i = 0; i < green; i++) {
        green[i].style.opacity ='0.3'
        
    }
 
     for (let i = 0; i < red; i++) {
        red[i].style.opacity ='0.3'
        
    }
     for (let i = 0; i < yellow; i++) {
        yellow[i].style.opacity ='0.3'
        
    }
    
}
var step=0;

function startTraffic(){
dimLights();
   for (let i = 0; i < red.length; i++) {
    red[i].style.opacity='1'
    
   }
   green[step].style.opacitty='1';
   red[step].style.opacity='0.3';

setTimeout(function(){
    dimLights();
    for (let i = 0; i < red.length; i++) {
    red[i].style.opacity='1'
    
   }
   yellow[step].style.opacitty ='1';
   red[step].style.opacity='0.3';

   setTimeout(function () {
    step++;
    if(step >= green.length) step ==0;
    startTraffic();
    
},2000)

},5000)
}
    
startTraffic();


//   table{
//         size: 200px;
//         border-color: white;
//         border: solid;
        
//      }
//      #display{
//         background-color: white;
//         border-left: none;
//         border-right: none;
//         border: none;
//      }

//     .color{
//         border-radius: 50%; 
//         width: 5px;
//         height: 5px;
//     }

//      #middle{
       
//      }
//      #colorG{
//         background-color: green;
//         opacity: 0.2;

//      }
//      #colorR{
//         background-color: red;
//         opacity: 0.2;

//      }
//      #colorY{
//        background-color: yellow;
//        opacity: 0.2