let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let fruta = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}//randomiza a criação da fruta
let direcao = "right";

let pontos = 0 ;

function criarBG() {
    context.fillStyle = "#C4A7F2";
    context.fillRect(0, 0, 16 * box, 16 * box)
}//desenha background

function criarCobra() {
    for(i=0; i < snake.length; i++){
        context.fillStyle = "#F26B83"
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
} //desenha cobra

function criarFruta() {
    context.fillStyle = "orange"
    context.fillRect(fruta.x, fruta.y, box, box)
}//desenha fruta

document.addEventListener('keydown', atualizar);

function atualizar (event){
    if(event.keyCode == 37 && direcao != 'right') direcao = 'left';
    if(event.keyCode == 38 && direcao != 'down') direcao = 'up';
    if(event.keyCode == 39 && direcao != 'left') direcao = 'right';
    if(event.keyCode == 40 && direcao != 'up') direcao = 'down';
}//controles

function sistema(){

    criarBG();
    criarCobra();
    criarFruta();

    if(snake[0].x > 15 * box && direcao == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direcao == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direcao == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direcao == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('FIM DE JOGO !');
            window.location.reload(false);
        }
    }
  
    let snakeX = snake[0].x; 
    let snakeY = snake[0].y;

    if(direcao == "right") snakeX += box;
    if(direcao == "left")  snakeX -= box;
    if(direcao == "up") snakeY -= box;
    if(direcao == "down")  snakeY += box;

    if(snakeX != fruta.x || snakeY != fruta.y){
        snake.pop();
    }
    else{
        fruta.x = Math.floor(Math.random() * 15 + 1) * box;
        fruta.y = Math.floor(Math.random() * 15 + 1) * box;
       
        let points = document.querySelector('#points');//
        pontos++;
        console.log(pontos)
        points.innerHTML = "Seus Pontos:" + pontos;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}



let jogo = setInterval(sistema, 80);

