const playBoard = document.querySelector('.play-board');
const highScoreElement = document.querySelector('.high-score');
const scoreElement = document.querySelector('.score');

let foodX, foodY;
let snakeX = 15, snakeY = 15;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let gameOver = false;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

//* change food position

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;


}
//* End change food position



//* when snake game over 
const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Geme Over!!!!!")
    location.reload();
}



//* change direction
const changeDirection = (e) => {

    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }

}
//* End change direction




//* show food and snake
const initGame = () => {
    if (gameOver) return handleGameOver();

    let htmlMarkup = `<div class:"food" style="grid-area:${foodX} /${foodY};   background-color: rgb(236, 73, 40); "></div>`;
    //* checking if the snake hit the food
    if (snakeX === foodY & snakeY === foodX) {
        changeFoodPosition();

        // * add point to score 
        score++;
        scoreElement.innerText = `Score: ${score}`;

        //* show new high score
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem('high score', highScore);
        highScoreElement.innerText = `High Score: ${highScore}`;


        snakeBody.push([foodX, foodY]);
    }



    //* show all snake when move and add food to snake
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]

    }
    snakeBody[0] = [snakeX, snakeY];
   



    //* add direction 
    snakeX += velocityX;
    snakeY += velocityY;



    //* check snake is out of wall
    if (snakeX <= 0 || snakeY <= 0 || snakeX > 30 || snakeY > 30) {
        gameOver = true;
    }




    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class:"head" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]};  background-color: rgb(236, 210, 40); "></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    playBoard.innerHTML = htmlMarkup;

}
//* End show food and snake







changeFoodPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);

