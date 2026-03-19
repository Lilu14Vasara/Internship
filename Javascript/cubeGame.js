 let score=0;
 let size = 2;
 let timer =50;
 let isPaused = false;
 let height=90;
 let weight=90;

  let container = document.getElementById('game');
   let pauseBtn = document.getElementById('pause-btn');
   let startbtn=document.getElementById('start-btn');
   let resumebtn=document.getElementById('resume-btn');
   let items=document.getElementById('items')

   items.style.display='none';
   resumebtn.style.display='none';
   container.style.display='none';


let myInterval=null;
function startTimer() {
  myInterval = setInterval(function myTimer() {
    if (!isPaused) {
      timer--
  document.getElementById("timer").innerHTML =timer;
 if(timer == 0){
    alert("Game is over");
    alert(`Your Score is ${score}` )
    document.getElementById('score').innerHTML=''
    
    
    clearInterval(myInterval)
    timer=50;
    score=0;
    size=2;
   }
      
    }
   
}, 1000);
  
}




function sizeIncrease(){
    if (isPaused) {
      return;   
    }
    if (size>20) size=20;
              size++ ;
               score++;
                    
              document.getElementById('score').innerHTML= score;
              createTable() }

function pauseTimer() {
    isPaused = true;
    // clearInterval(myInterval);
    resumebtn.style.display='flex';
    pauseBtn.style.display='none';
   
    // //  container.hidden = true;
    // // container.style.pointerEvents="none"
    
    // // container.style.cursor="default"
    // pauseBtn.disabled = true; 
    
}
function resumetimer(){
    isPaused = false;
    resumebtn.style.display='none';
    pauseBtn.style.display='inline-block';


}


function startGame(){
  startbtn.style.display='none'
    items.style.display='flex';
   container.style.display='flex';
   startTimer()
   createTable()

}

function createTable() {

const randomColor=["blue","purple","green","pink","gray","yellow","orange"];
let colorRandom=Math.floor(Math.random()*randomColor.length);
 let choosenRandomColor=randomColor[colorRandom]
 

 let rowRandom=Math.floor(Math.random()*size)
 let colRandom=Math.floor(Math.random()*size)

   
    container.innerHTML = "";
    table = document.createElement('table');
  
    
    table.style.border="3px solid white"
    table.style.alignItems="center";
    table.style.backgroundColor="white"
    
    table.style.borderBlockColor="white"
  
    

    for (let i = 0; i < size; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < size; j++) {
            let td = document.createElement('td');
            td.style.backgroundColor=choosenRandomColor;

            if (i == rowRandom && j == colRandom) {
                 td.style.opacity="0.28"//
               td.addEventListener('click',sizeIncrease)
            }
            td.style.borderRadius="10px"
            td.style.border="1px solid black"

            td.style.width = "70px";
            td.style.height = "70px";
        
        
            td.textContent = " ";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    container.appendChild(table);
}

