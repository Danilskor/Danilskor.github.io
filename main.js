let rocket;
let obstacles = [];
let boosters = [];
let globalObstacles = new Map();
let globalBoosters = new Map();
let fuel = 500;
const gravity = 0.05;
const thrust = 0.8;
let thrusting = false;
let turningLeft = false;
let turningRight = false;
const maxEngineSpeed = 10;
let boosterEffectDuration = 0;
let gameState = 'playing';
let scaleFactor;
let score = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    scaleFactor = min(windowWidth / 1920, windowHeight / 1080);
    rocket = new Rocket();
    generateObstaclesAndBoostersAround(rocket.position.x, rocket.position.y, 3);
    setupControls();
    
    if (isMobileDevice()) {
        document.getElementById('controls').style.visibility = 'visible';
    } else {
        document.getElementById('controls').style.visibility = 'hidden';
    }
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    scaleFactor = min(windowWidth / 1920, windowHeight / 1080);

    if (isMobileDevice()) {
        document.getElementById('controls').style.visibility = 'visible';
    } else {
        document.getElementById('controls').style.visibility = 'hidden';
    }
}

function setupControls() {
    document.getElementById('thrust').addEventListener('touchstart', () => { thrusting = true; });
    document.getElementById('thrust').addEventListener('touchend', () => { thrusting = false; });
    document.getElementById('left').addEventListener('touchstart', () => { turningLeft = true; });
    document.getElementById('left').addEventListener('touchend', () => { turningLeft = false; });
    document.getElementById('right').addEventListener('touchstart', () => { turningRight = true; });
    document.getElementById('right').addEventListener('touchend', () => { turningRight = false; });
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
    let fontSize = max(32, 32 * scaleFactor)
    textSize(fontSize);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2 - 100 * scaleFactor);
    
    fill(0, 255, 0);
    rect(width / 2, height / 2, 180 * scaleFactor, 100* scaleFactor);
    
    fill(0);
    fontSize = max(20, 20 * scaleFactor)
    textSize(fontSize);
    text("Далее", width / 2, height / 2);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    scaleFactor = min(windowWidth / 1920, windowHeight / 1080);
}