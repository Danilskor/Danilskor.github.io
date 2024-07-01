let rocket;
let obstacles = [];
let boosters = [];
let globalObstacles = new Map();
let globalBoosters = new Map();
let fuel = 500;
const gravity = 0.1;
const thrust = 0.2;
let thrusting = false;
let turningLeft = false;
let turningRight = false;
const maxEngineSpeed = 10;
let boosterEffectDuration = 0;
let gameState = 'playing';

function setup() {
    createCanvas(windowWidth, windowHeight);
    rocket = new Rocket();
    generateObstaclesAndBoostersAround(rocket.pos.x, rocket.pos.y, 3);
}

function draw() {
    if (gameState === 'playing') {
        playGame();
    } else if (gameState === 'menu') {
        drawMenu();
    }
}

function drawMenu() {
    background(0);
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2 - 40);
    
    fill(0, 255, 0);
    rect(width / 2 - 50, height / 2 + 20, 100, 40);
    
    fill(0);
    textSize(20);
    text("Далее", width / 2, height / 2 + 40);
}
