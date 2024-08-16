"use strict";


// board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// speed of the snake
var velocityx = 0;
var velocity = 0;

// snake head
var snakex = blockSize*5;
var snakey = blockSize*5;

//giving the shape of the snake body
var snakeBody = [];

//food
var foodx;
var foody;

var gameOver = false;

window.onload = function () {
    board = document.querySelector("#board");
    board.height = rows*blockSize;
    board.width = cols*blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/10);//100 milliseconds
}

function update() {
    if(gameOver) {
        return;
    }

    // board color
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodx, foody, blockSize, blockSize);

    if(snakex == foodx && snakey == foody) {
        snakeBody.push([foodx, foody]);
        placeFood();
    }

    // moving the snake body with snake head
    for(var i=snakeBody.length-1; i>0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakex, snakey]; 
    }

    // snake color
    context.fillStyle = "lime";
    snakex += velocityx*blockSize; // it will movie has 1 unit or 1 square
    snakey += velocity*blockSize;
    context.fillRect(snakex, snakey, blockSize, blockSize);
    for(var i=0; i<snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    
    // game over conditions
    if(snakex<0 || snakex>cols*blockSize || snakey<0 || snakey>rows*blockSize) {
        gameOver = true;
        alert("Game Over");
    }

    for(var i=0; i<snakeBody.length; i++) {
        if(snakex == snakeBody[i][0] && snakey == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

function changeDirection(e) {
    if(e.code == "ArrowUp" && velocity != 1) {
        velocityx = 0;
        velocity = -1;
    }
    else if(e.code == "ArrowDown" && velocity != -1) {
        velocityx = 0;
        velocity = 1;
    }
    else if(e.code == "ArrowLeft" && velocityx != 1) {
        velocityx = -1;
        velocity = 0;
    }
    else if(e.code == "ArrowRight" && velocityx != -1) {
        velocityx = 1;
        velocity = 0;
    }
}


function placeFood() {
    foodx = Math.floor(Math.random()*cols)*blockSize;
    foody = Math.floor(Math.random()*rows)*blockSize;
}




