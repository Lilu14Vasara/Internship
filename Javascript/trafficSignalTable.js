// let nG=document.getElementById('northG');
// let nR=document.getElementById('northR');
// let nY= document.getElementById('northY');
// let wG=document.getElementById('westG');
// let wR=document.getElementById('westR');
// let wY=document.getElementById('westY');
// let eG=document.getElementById('eastG');
// let eR=document.getElementById('eastR');
// let eY=document.getElementById('eastY');
// let sG= document.getElementById('southG');
// let sR= document.getElementById('southR');
// let sY=document.getElementById('southY');

// let colorR=[nR,wR,sR,eR];
// let colorG=[nG,wG,sG,eG];
// let colorY=[nY,wY,sY,eY];

// const colors=[ nG,nR,nY,wG,wR,wY,eG,eR,eY,sG,sR,sY]
// function dimAll() {
//     for (let i = 0; i < colors.length; i++) {
//         colors[i].style.opacity='0.2';
        
//     }
// }
// let count=0;
// function startTrafficSignal() {
//     dimAll();
//         for (let i = 0; i < colorR.length; i++) {
//            colorR[i].style.opacity='1'  ;
//         }
//         colorG[count].style.opacity='1';
//         colorR[count].style.opacity='0.2';
  
//    setTimeout(() => {
//     colorG[count].style.opacity='0.2';
//     colorY[count].style.opacity='1';
        
//        setTimeout(() => {
//         if (colorY[count]) {
//             colorY[count].style.opacity='0.2';
//             colorR[count].style.opacity='1';

//             count=(count+1) % 4;

//             startTrafficSignal();     
//         }
       
//        }, 3000);
      
//     }, 5000);
// }
// startTrafficSignal()


// let second = 3;
// colorY[count].innerHTML = second;

// let timer = setInterval(() => {
//     second--;
//     if (second > 0) {
//         colorY[count].innerHTML = second;
//     } else {
//         clearInterval(timer);
//         colorY[count].innerHTML = 'G';
//         colorY[count].style.opacity = '0.4';
        
//         count = (count + 1) % 4;
//         startTrafficSignal(); 
//     }


let nG=document.getElementById('northG');
let nR=document.getElementById('northR');
let nY= document.getElementById('northY');
let wG=document.getElementById('westG');
let wR=document.getElementById('westR');
let wY=document.getElementById('westY');
let eG=document.getElementById('eastG');
let eR=document.getElementById('eastR');
let eY=document.getElementById('eastY');
let sG= document.getElementById('southG');
let sR= document.getElementById('southR');
let sY=document.getElementById('southY');

let colorR=[nR,wR,sR,eR];
let colorG=[nG,wG,sG,eG];
let colorY=[nY,wY,sY,eY];

const colors=[ nG,nR,nY,wG,wR,wY,eG,eR,eY,sG,sR,sY]
function dimAll() {
    for (let i = 0; i < colors.length; i++) {
        colors[i].style.opacity='0.2';
        
    }
}
let count=0;
function startTrafficSignal() {
    dimAll();
    let first=7;
    // let secondR=9;
    // let thirdR=13;

        for (let i = 0; i < colorR.length; i++) {
           colorR[i].style.opacity='1'  ;
        }
        colorG[count].style.opacity='1';
        colorR[count].style.opacity='0.2';

         let timerR = setInterval(() => {
    
    first--;
    if (first >= 0) {
        colorR[(count + 1) % 4].innerHTML = first;
    } else {
        clearInterval(timerR);
        colorR[(count + 1) % 4].innerHTML = 'R';
        // colorR[(count + 1) % 4].style.opacity = '0.2';
        
   }
//    if(secondR>0){
//     colorR[(count + 2) % 4].innerHTML = secondR;
//    }else{
//     colorR[(count + 1) % 4].innerHTML = 'R';
//         colorR[(count + 2) % 4].style.opacity = '0.2';
//    }
},1000)
  
setTimeout(() => {
    colorG[count].style.opacity='0.2';
    colorY[count].style.opacity='1';
        
   let second = 3;
   colorY[count].innerHTML = second;

 let timer = setInterval(() => {
    second--;                                             
    if (second >= 0) {
        colorY[count].innerHTML = second;
    } else {
        clearInterval(timer);
        colorY[count].innerHTML = 'Y';
        colorY[count].style.opacity = '0.4';
        
        count = (count + 1) % 4;
        startTrafficSignal(); 
   }
   },1000)
      
}, 5000);
}
startTrafficSignal();

    
