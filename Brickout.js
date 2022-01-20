const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
let bricks = [];
let brickrows = 7;
let brickcolums = 7;
// bricks matrix as objects
for (i = 0; i < brickrows; i++) {
   console.log(bricks[i] = []);
    for (j = 0; j < brickcolums; j++) {
        bricks[i][j] = { x: 0, y: 0, status: 1 };
    }
}
// plotting bricks on canvas
function Bricks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (i = 0; i < brickrows; i++) {
        for (j = 0; j < brickcolums; j++) {
            if (bricks[i][j].status == 1) {
                var brickX = (i * (60)) + 30;
                var brickY = (j * (40)) + 30;
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, 50, 25);
                ctx.fillStyle = "grey"
                ctx.fill();
                ctx.closePath();
            }
        }
    }
    createpaddle(paddlexposition)
    ball()
   TotalLives()
   countscore()
   gameover()
}
let count1=0
// paddle creation
let paddlexposition = 180, paddleyposition = 520;
let paddlewidth = 120, paddleheight = 30;
function createpaddle(paddlexposition) {
    ctx.beginPath();
    ctx.rect(paddlexposition, paddleyposition, paddlewidth, paddleheight);
    ctx.fillStyle = "green"
    ctx.fill()
    // ctx.stroke();
}
// ball creation and making the call to movingball()
let ballxposition = 220
ballyposition = 450
xspeed = 10, yspeed = 10;
function ball() {
    ctx.beginPath();
    ctx.arc(ballxposition, ballyposition, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "red"
    ctx.fill()
    // ctx.stroke();
    ctx.closePath();
    movingball()
}
// ball moving condition and bouncing the ball and removing the bricking
let count = 0;
let score = 0;
let totalbricks = brickrows * brickcolums
function movingball() {
    ballxposition = ballxposition + xspeed;
    ballyposition = ballyposition + yspeed;
    for (i = 0; i < brickrows; i++) {
        for (j = 0; j < brickcolums; j++) {
            let z = bricks[i][j];
            if (z.status == 1) {
                if (ballxposition > z.x && ballxposition < z.x + 50 && ballyposition > z.y && ballyposition < z.y + 25) {
                    yspeed = -yspeed;
                    z.status = 0;
                    count++;
                    Win()
                    score=score+10;
                }
            }
        }
    }
    if (ballxposition == 10 || ballxposition == 450 - 10) {
        xspeed = -xspeed
    }
    if (ballyposition == 20 || ballyposition == 600 - 10) {
        yspeed = -yspeed
    }
    if(ballxposition > paddlexposition && ballxposition < paddlexposition + 180 && ballyposition > paddleyposition && ballyposition < paddleyposition + 30)
    {
        yspeed=-yspeed;
    }
    
}
let Lifes=3;
//counting the score
function countscore()
{
ctx.fillText("Score: "+score, 10, 23,100);
ctx.font = "20px monospace";
// ctx.fillStyle="blue";
// ctx.fill()
}
function TotalLives()
{
    ctx.fillText("Lifes: "+Lifes, 370, 23,100);
    ctx.font = "20px monospace";
}
// gameover condtion
 function gameover()
 {
       if(ballyposition==590)
       {
           Lifes--;
           if(Lifes==2)
           {
               alert("only 2 chances left");
           }
           if(Lifes==1)
           {
               alert("only 1 chance left ")
           }
           if(Lifes==0)
           {
            alert("GAME OVER! ")
            document.location.reload();
           }
 
       }
 }
 // wining the game
function Win() {
    if (count == brickcolums * brickrows) {
        alert("You Won!");
        document.location.reload();
        // speed();
    }
      
}
// increasing the speed of the ball 
let increasespeed=40;
function speed()
{
    if(count==25)
      {
         increasespeed=increasespeed-30;
        //  console.log(increasespeed);
      }
      return increasespeed;
}
// paddle left move
function leftmove(paddlexposition) {
    if (paddlexposition != 0) {
        return paddlexposition -20;
    }
    else {
        return paddlexposition;
    }

}
// paddle right move
function rightmove(paddlexposition) {
    if (paddlexposition != 340) {
        return paddlexposition + 10;
    }
    else {
        return paddlexposition;
    }
}
function handleKeyPress(event) {
    if (event.keyCode === 39) {
        ctx.clearRect(paddlexposition, paddleyposition, paddlewidth, paddleheight);
        paddlexposition = rightmove(paddlexposition)
        createpaddle(paddlexposition)

    }
    else if (event.keyCode === 37) {
        ctx.clearRect(paddlexposition, paddleyposition, paddlewidth, paddleheight);
        paddlexposition = leftmove(paddlexposition)
        createpaddle(paddlexposition)
    }

}
document.addEventListener('keyup', handleKeyPress);
document.addEventListener('keydown', handleKeyPress);
Bricks()
// TotalLives();
// countscore()
// let count1=0
let game = document.addEventListener("click", function(){
    document.getElementById("canvas").innerHTML = setInterval(Bricks,70);
  });
//   let game=setInterval(Bricks,40)
// For random colors
function colorcodes() {
    let colors = ['#800080', '#FF00FF', '#0000FF', '#00FFFF', '#008000', '#FFFF00', '#FF0000', '#000000', '#808080', '#FF00FF']
    let randomnumber = Math.floor(Math.random() * 12)
    return colors[randomnumber];
}
