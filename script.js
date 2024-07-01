let rocket;
let obstacles = [];
let boosters = [];
let globalObstacles = new Map();
let globalBoosters = new Map();
let fuel = 100;
const gravity = 0.1;
const thrust = 0.2;
let thrusting = false;
let turningLeft = false;
let turningRight = false;
const maxEngineSpeed = 5;  // Максимальная скорость от двигателя
let boosterEffectDuration = 0;  // Продолжительность эффекта бустера
let gameState = 'playing';  // Состояние игры: 'playing' или 'menu'

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

function playGame() {
    background(0);

    translate(width / 2 - rocket.pos.x, height / 2 - rocket.pos.y);

    drawGround();

    handleThrusting();
    handleTurning();

    rocket.update();
    rocket.display();

    let currentCellX = floor(rocket.pos.x / width);
    let currentCellY = floor(rocket.pos.y / height);

    generateObstaclesAndBoostersAround(rocket.pos.x, rocket.pos.y, 3);

    checkObstaclesCollision();
    checkBoostersCollection();

    displayHUD();
}

function keyPressed() {
    if (gameState === 'playing') {
        if (['w', 'W', 'ц', 'Ц'].includes(key)) {
            thrusting = true;
        }
        if (['A', 'a', 'Ф', 'ф'].includes(key)) {
            turningLeft = true;
        } else if (['D', 'd', 'В', 'в'].includes(key)) {
            turningRight = true;
        }
    }
}

function keyReleased() {
    if (gameState === 'playing') {
        if (['w', 'W', 'ц', 'Ц'].includes(key)) {
            thrusting = false;
        }
        if (['A', 'a', 'Ф', 'ф'].includes(key)) {
            turningLeft = false;
        } else if (['D', 'd', 'В', 'в'].includes(key)) {
            turningRight = false;
        }
    }
}

function mousePressed() {
    if (gameState === 'menu') {
        if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 + 20 && mouseY < height / 2 + 60) {
            restartGame();
        }
    }
}

function drawGround() {
    fill(34, 139, 34);
    rect(rocket.pos.x - width * 1.5, height - 50, width * 3, 50);
}

function handleThrusting() {
    if (thrusting && fuel > 0) {
        rocket.applyThrust();
        fuel -= 0.1;
    }
}

function handleTurning() {
    if (turningLeft) {
        rocket.turn(-0.1);
    }
    if (turningRight) {
        rocket.turn(0.1);
    }
}

function checkObstaclesCollision() {
    for (let obstacle of obstacles) {
        obstacle.display();
        if (rocket.hits(obstacle)) {
            gameOver();
        }
    }
}

function checkBoostersCollection() {
    for (let booster of boosters) {
        booster.display();
        if (rocket.collects(booster)) {
            booster.applyEffect(rocket);
            boosters = boosters.filter(b => b !== booster);
        }
    }
}

function gameOver() {
    gameState = 'menu';
}

function displayHUD() {
    fill(255);
    textSize(24);
    textAlign(LEFT, TOP);
    text(`Fuel: ${nf(fuel, 0, 2)}`, rocket.pos.x - width / 2 + 10, rocket.pos.y - height / 2 + 40);
    text(`Global X: ${nf(rocket.pos.x, 0, 2)}`, rocket.pos.x - width / 2 + 10, rocket.pos.y - height / 2 + 70);
    text(`Global Y: ${nf(rocket.pos.y, 0, 2)}`, rocket.pos.x - width / 2 + 10, rocket.pos.y - height / 2 + 100);
    text(`Speed: ${nf(rocket.vel.mag(), 0, 2)}`, rocket.pos.x - width / 2 + 10, rocket.pos.y - height / 2 + 130);
    if (boosterEffectDuration > 0) {
        text(`Booster Effect: ${nf(boosterEffectDuration, 0, 2)}`, rocket.pos.x - width / 2 + 10, rocket.pos.y - height / 2 + 160);
        boosterEffectDuration -= 0.1;
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

function restartGame() {
    rocket = new Rocket();
    obstacles = [];
    boosters = [];
    fuel = 100;
    boosterEffectDuration = 0;
    thrusting = false;
    turningLeft = false;
    turningRight = false;
    gameState = 'playing';
    generateObstaclesAndBoostersAround(rocket.pos.x, rocket.pos.y, 3);
}

function generateObstaclesAndBoostersAround(x, y, radius) {
    let cellX = floor(x / width);
    let cellY = floor(y / height);

    for (let i = -radius; i <= radius; i++) {
        for (let j = -radius; j <= radius; j++) {
            let key = `${cellX + i},${cellY + j}`;
            if (!globalObstacles.has(key)) {
                let newObstacles = generateObstaclesInCell(cellX + i, cellY + j);
                globalObstacles.set(key, newObstacles);
                obstacles.push(...newObstacles);
            }
            if (!globalBoosters.has(key)) {
                let newBoosters = generateBoostersInCell(cellX + i, cellY + j);
                globalBoosters.set(key, newBoosters);
                boosters.push(...newBoosters);
            }
        }
    }
}

function generateObstaclesInCell(cellX, cellY) {
    let obstaclesInCell = [];
    let baseX = cellX * width;
    let baseY = cellY * height;
    let numObstacles = 5;

    for (let i = 0; i < numObstacles; i++) {
        let x = random(baseX, baseX + width);
        let y = random(baseY, baseY + height);

        if (y > height - 100) {
            continue;
        }

        let newObstacle = new Obstacle(x, y, 50, 50);
        obstaclesInCell.push(newObstacle);
    }

    return obstaclesInCell;
}

function generateBoostersInCell(cellX, cellY) {
    let boostersInCell = [];
    let baseX = cellX * width;
    let baseY = cellY * height;
    let numBoosters = 2;

    for (let i = 0; i < numBoosters; i++) {
        let x = random(baseX, baseX + width);
        let y = random(baseY, baseY + height);

        if (y > height - 100) {
            continue;
        }

        let newBooster = new Booster(x, y, 20, 20);
        boostersInCell.push(newBooster);
    }

    return boostersInCell;
}

class Rocket {
    constructor() {
        this.pos = createVector(width / 2, height - 50);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.angle = 0;
    }

    applyThrust() {
        if (this.vel.mag() < maxEngineSpeed || boosterEffectDuration > 0) {
            let force = p5.Vector.fromAngle(this.angle - PI / 2);
            force.mult(thrust);
            this.acc.add(force);
        }
    }

    turn(angle) {
        this.angle += angle;
    }

    update() {
        let gravityForce = createVector(0, gravity);
        this.acc.add(gravityForce);

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);

        if (this.pos.y > height - 75) {
            this.pos.y = height - 75;
            this.vel.y = 0;
            this.vel.x = 0;
        }
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        fill(150);
        rectMode(CENTER);
        rect(0, 0, 30, 50);
        pop();
    }

    hits(obstacle) {
        let d = dist(this.pos.x, this.pos.y, obstacle.x, obstacle.y);
        return d < 25 + obstacle.w / 2;
    }

    collects(booster) {
        let d = dist(this.pos.x, this.pos.y, booster.x, booster.y);
        return d < 25 + booster.w / 2;
    }
}

class Obstacle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    display() {
        fill(255, 0, 0);
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
    }
}

class Booster {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color(random(0, 255), 255, random(0, 255));
    }

    display() {
        fill(this.color);
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
    }

    applyEffect(rocket) {
        rocket.vel.mult(1.5);
        fuel += 50;
        boosterEffectDuration = 500;
    }
}
