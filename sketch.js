var backImage, backgr;
var player, player_running;
var ground, ground_img;

var fruitImg, obsImg;
var score = 0;
var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload() {
    backImage = loadImage("jungle.jpg");
    player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
    fruitImg = loadImage("banana.png");
    obsImg = loadImage("stone.png");
}

function setup() {
    createCanvas(800, 400);

    backgr = createSprite(0, 0, 800, 400);
    backgr.addImage(backImage);
    backgr.scale = 1.5;
    backgr.x = backgr.width / 2;
    backgr.velocityX = -4;

    player = createSprite(100, 340, 20, 50);
    player.addAnimation("Running", player_running);
    player.scale = 0.1;

    ground = createSprite(400, 350, 800, 10);
    ground.x = ground.width / 2;
    ground.visible = false;
    fruitGroup = createGroup();
    obsGroup = createGroup();

}

function draw() {
    background(255);
    drawSprites();

    // text(mouseX + " " + mouseY, mouseX, mouseY);
    // text(mouseX + " ," + mouseY, mouseX, mouseY)
    // text("Score : " + score, 900, 50);
    if (gameState === PLAY) {

        if (backgr.x < 100) {
            backgr.x = backgr.width / 2;
        }

        if (keyDown("space") && player.y > 130) {
            player.velocityY = -12;
        }
        player.velocityY = player.velocityY + 0.8;

        player.collide(ground);
        spawnFruit();
        spawnObs();
        if (fruitGroup.isTouching(player)) {
            fruitGroup.destroyEach();
            score = score + 2;
            player.scale += 0.01;
        }
    }
    if (obsGroup.isTouching(player)) {
        gameState = END;
    } else if (gameState === END) {
        backgr.velocityX = 0;
        player.visible = false;
        textSize(30);
        // fill(255);
        text("GameOver! ", 300, 220);

        fruitGroup.destroyEach();
        obsGroup.destroyEach();
    }
    textSize(20);
    text("Score : " + score, 650, 50);
}

function spawnFruit() {
    if (frameCount % 80 === 0) {
        var fruit = createSprite(600, 250, 40, 10);
        fruit.y = random(120, 200);
        fruit.addImage(fruitImg);
        fruit.scale = 0.05;
        fruit.velocityX = -4;
        fruit.lifetime = 300;
        player.depth = fruit.depth;
        fruitGroup.add(fruit);
    }

}

function spawnObs() {
    if (frameCount % 120 === 0) {
        var obs = createSprite(900, 340, 40, 10);
        obs.addImage(obsImg);
        obs.scale = 0.1;
        obs.velocityX = -4;
        obs.lifetime = 300;
        player.depth = obs.depth;
        obsGroup.add(obs);
    }

}