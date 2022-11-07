

//TRES EN RAYA
const cuadro_btn = document.querySelectorAll(".cuadro");
const info = document.getElementById("juego-info");
const juego_btn = document.getElementById("juego-boton")
var i = 1;
const jBtn_e = "pointer-events:initial;opacity:initial;",
  jBtn_d = "pointer-events:none;opacity:40%;";
let state = false;

var pWin = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
[0, 3, 6], [1, 4, 7], [2, 5, 8],
[0, 4, 8], [2, 4, 6]
];

function comprobar() {
  juego_btn.style.cssText = jBtn_d;
  for (var j = 0; j < pWin.length; j++) {
    if (cuadro_btn[pWin[j][0]].innerHTML === "X" && cuadro_btn[pWin[j][1]].innerHTML === "X" && cuadro_btn[pWin[j][2]].innerHTML === "X") {
      info.innerHTML = '"X" Gana';
      state = true;
      deshabilitarCasillas();
    } else if (cuadro_btn[pWin[j][0]].innerHTML === "O" && cuadro_btn[pWin[j][1]].innerHTML === "O" && cuadro_btn[pWin[j][2]].innerHTML === "O") {
      info.innerHTML = '"O" Gana';
      state = true;
      deshabilitarCasillas();
    }
  }
  if (cuadro_btn[0].innerHTML != "" && cuadro_btn[1].innerHTML != "" && cuadro_btn[2].innerHTML != "" && cuadro_btn[3].innerHTML !== "" && cuadro_btn[4].innerHTML != "" && cuadro_btn[5].innerHTML != "" && cuadro_btn[6].innerHTML != "" && cuadro_btn[7].innerHTML != "" && cuadro_btn[8].innerHTML != "" && state == false) {
    info.innerHTML = "Empate";
    deshabilitarCasillas(false);
  }

}

function deshabilitarCasillas(y) {
  (y == false) ? i = Math.floor(Math.random() * (3 - 1)) + 1 : 0;
  for (var n_boton = 0; n_boton < cuadro_btn.length; n_boton++) {
    cuadro_btn[n_boton].style.setProperty("pointer-events", "none");
  }
  juego_btn.style.cssText = jBtn_e;
}

function nEmpieza() {
  juego_btn.style.cssText = jBtn_d;
  let c1;
  (i % 2 == 0) ? c1 = "X" : c1 = "O";
  info.innerHTML = `Presione cualquier cuadro para iniciar: <b>"${c1}"</b> empieza.`;
}

cuadro_btn.forEach(boton => {
  boton.onclick = function () {
    info.innerHTML = "";
    (i % 2 == 0) ? boton.innerHTML = "X" : boton.innerHTML = "O";
    comprobar();
    boton.style.setProperty("pointer-events", "none");
    i++;
    (i == 3) ? i = 1 : 0;
  }
});

juego_btn.onclick = function () {
  for (var n_boton = 0; n_boton < cuadro_btn.length; n_boton++) {
    cuadro_btn[n_boton].style.cssText = "pointer-events:initial;";
    cuadro_btn[n_boton].innerHTML = "";
    state = false;
  }
  nEmpieza();
}

nEmpieza();


//SNAKE
let grid = document.querySelector(".grid") 
let popup = document.querySelector(".popup"); 
let playAgain = document.querySelector(".playAgain"); 
let scoreDisplay = document.querySelector(".scoreDisplay") 
let left = document.querySelector(".left") 
let bottom = document.querySelector(".bottom") 
let right = document.querySelector(".right") 
let up = document.querySelector(".top") 
let width=10; 
let currentIndex = 0 
let appleIndex=0 
let currentSnake=[2,1,0] 
let direction =1 
let score = 0 
let speed = 0.8 
let intervalTime =0 
let interval =0

document.addEventListener("DOMContentLoaded",function(){ 
document.addEventListener("keyup",control) 
createBoard() 
startGame() 
playAgain.addEventListener("click", replay); 
})

//createboard function
function createBoard(){ 
popup.style.display = "none"; 
for(let i=0;i<100;i++){
let div =document.createElement("div") 
grid.appendChild(div) 
}
} 

//startgame function
function startGame(){ 
let squares =document.querySelectorAll(".grid div") 
randomApple(squares) 
//random apple 
direction =1 
scoreDisplay.innerHTML=score 
intervalTime=1000 
currentSnake =[2,1,0] 
currentIndex = 0 
currentSnake.forEach(index=>squares[index].classList.add("snake")) 
interval = setInterval(moveOutcome,intervalTime) 
} 

function moveOutcome (){ 
let squares =document.querySelectorAll(".grid div") 
if(checkForHits(squares)){
alert("you hit something") 
popup.style.display="flex" 
return clearInterval(interval) 
}else{ 
moveSnake(squares) 
}
} 

function moveSnake(squares){
let tail = currentSnake.pop() 
squares[tail].classList.remove("snake") 
currentSnake.unshift(currentSnake[0]+direction)  
// movement ends here  
eatApple(squares,tail)  
squares[currentSnake[0]].classList.add("snake")  
}

function checkForHits(squares){  
if(  
(currentSnake[0] + width >=(width*width) && direction === width) ||
(currentSnake[0] % width ===width -1 && direction ===1) ||   
(currentSnake[0] % width === 0 && direction === -1) ||   
(currentSnake[0] - width <= 0 && direction === -width) ||
squares[currentSnake[0] + direction].classList.contains("snake")   
){ 
return true  
}else{  
return false 
}
}  

function eatApple(squares,tail){ 
if(squares[currentSnake[0]].classList.contains("apple")){ 
squares[currentSnake[0]].classList.remove("apple") 
squares[tail].classList.add("snake") 
currentSnake.push(tail)
randomApple(squares) 
score++ 
scoreDisplay.textContent = score 
clearInterval(interval) 
intervalTime = intervalTime *speed 
interval = setInterval(moveOutcome,intervalTime) 
}
} 

function randomApple(squares){ 
do{ 
appleIndex =Math.floor(Math.random() * squares.length) 
}while(squares[appleIndex].classList.contains("snake")) 
squares[appleIndex].classList.add("apple") 
} 

function control(e){ 
if (e.keycode===39){
direction = 1 // right 
}else if (e.keycode===38){ 
direction = -width //if we press the up arrow, the snake will go ten divs up
}else if (e.keycode===37){ 
direction = -1 // left, the snake will go left one div
}else if (e.keycode===40){
direction = +width // down the snake head will instantly appear 10 divs below from the current div 
} 
} 

up.addEventListener("click",()=>direction= -width ) 
bottom.addEventListener("click",()=>direction= +width ) 
left.addEventListener("click",()=>direction= -1 ) 
right.addEventListener("click",()=>direction= 1 )

 function replay() { 
 grid.innerHTML="" 
 createBoard()  
 startGame()  
 popup.style.display = "none"; 
 }   