function preload() {
  score = loadSound("score.wav")
  song = loadSound("song.wav")
}
function setup(){
createCanvas(600,400)

 ball = createSprite(300,200,15,15)
 ball.visible = false

 rightborder = createSprite(597.5,200,5,400)
 rightborder.shapeColor = "black"

 leftborder = createSprite(2.5,200,5,400)
 leftborder.shapeColor = "black"

 upborder = createSprite(300,2.5,600,5)
 upborder.shapeColor = "black"

 downborder = createSprite(300,397.5,600,5)
 downborder.shapeColor = "black"

 player_Paddle = createSprite(300,320,70,10)
 player_Paddle.shapeColor = "blue"

 computer_Paddle = createSprite(300,80,70,10)
 computer_Paddle.shapeColor = "red"

 player_Goal = createSprite(300,350,590,10)
 player_Goal.shapeColor = "lightblue"

 computer_Goal = createSprite(300,50,590,10)
 computer_Goal.shapeColor = "orange"

 player_Paddle_Edge_Right = createSprite(10,10,20,10)
 player_Paddle_Edge_Right.visible = false

 player_Paddle_Edge_Left = createSprite(10,10,20,10)
 player_Paddle_Edge_Left.visible = false

 player_Paddle_Center = createSprite(10,10,30,10)
 player_Paddle_Center.visible = false

 player_Score = 0

 computer_Score = 0
 
 songcounter = createSprite(0,0,10,20)
 songcounter.visible = false

 songcharge = 0

 gameState = 0

}

function draw() {
  background("white")

  if(songcounter.y === 400){
    songcharge = songcharge + 1
    songcounter.y = 0
  }

  if(songcharge === 30){
    songcharge = 0
    songcounter.y = 0
    song.play()
  }

  player_Paddle_Edge_Right.x = player_Paddle.x - 25
  player_Paddle_Edge_Right.y = player_Paddle.y

  player_Paddle_Edge_Left.x = player_Paddle.x + 25
  player_Paddle_Edge_Left.y = player_Paddle.y

  player_Paddle_Center.x = player_Paddle.x
  player_Paddle_Center.y = player_Paddle.y

  fill("black")
  textSize(25)
  text("𝒫𝒾𝓃𝑔 𝒫𝑜𝓃𝑔",235,30)

  if(gameState === 0){
    fill("black")
    textSize(15)
    text("Press Space",260,180)
    text("to Start",275,230)

    if(keyDown("space")){
      gameState = 1
      ball.velocityY = 10
      song.play()
      songcounter.velocityY = 50
    }
  }

  if(gameState === 1){
    fill("black")
    textSize(15)
    text("Player Score:"+player_Score,10,230)
    text("Computer Score:"+computer_Score,5,170)
  
  if(ball.isTouching(player_Paddle_Center)){
    ball.velocityY = -10
    ball.velocityX = 0
  } 

  if(ball.isTouching(player_Paddle_Edge_Left)){
    ball.velocityY = -10
    ball.velocityX = 10
  }

  if(ball.isTouching(player_Paddle_Edge_Right)){
    ball.velocityY = -10
    ball.velocityX = -10
  }

  if(ball.isTouching(computer_Paddle)){
    ball.velocityY = 10
    ball.velocityX = 0
  }

  if(ball.isTouching(rightborder)){
    ball.velocityX = -10
  }

  if(ball.isTouching(leftborder)){
    ball.velocityX = 10
  }

  if(ball.isTouching(player_Goal)){
    computer_Score = computer_Score + 1
    ball.x = 300
    ball.y = 200
    ball.velocityX = 0
    ball.velocityY = 0
    gameState = 1.5
    score.play()
  }

  if(computer_Score === 5){
    gameState = 2
  }

  player_Paddle.x = mouseX
  computer_Paddle.x = ball.x

  }

  if(gameState === 1.5){
    fill("black")
    textSize(15)
    text("Player Score:"+player_Score,10,230)
    text("Computer Score:"+computer_Score,5,170)

    fill("black")
    textSize(15)
    text("Press Space",260,180)
    text("to Start",275,230)

    if(keyDown("space")){
      gameState = 1
      ball.velocityY = 10
    }

  }

  if(gameState === 2){
  fill("black")
  textSize(25)
  text("Computer Wins!",210,170)
  textSize(15)
  text("Press R to Restart",240,230)

 if(keyDown("r")){
   gameState = 1
   computer_Score = 0
   ball.x = 300
   ball.y = 200
   player_Paddle.x = 300
   player_Paddle.y = 320
   ball.velocityY = 10
 }

  }

  for (var a = 5; a < 600; a=a+20){
  line(a,200,a+10,200);
  }

  fill("green")
  ellipse(ball.x,ball.y,15,15)

  drawSprites()
}