function playGame() {
    background(0);
    drawBackground(rocket.position.y);

    translate(width / 2 - rocket.position.x, height / 2 - rocket.position.y);

    drawGround();

    handleThrusting();
    handleTurning();

    rocket.update();
    rocket.display();

    let currentCellX = floor(rocket.position.x / width);
    let currentCellY = floor(rocket.position.y / height);

    generateObstaclesAndBoostersAround(rocket.position.x, rocket.position.y, 3);

    checkObstaclesCollision();
    checkBoostersCollection();

    updateScore();
    displayHUD();
}

function updateScore() {
    score = max(score, floor((- rocket.position.y) / 10));
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
            //gameOver();
        }
    }
}

function checkBoostersCollection() {
    for (let booster of boosters) {
        booster.display();
        if (rocket.collects(booster)) {
            //booster.applyEffect(rocket);
            boosters = boosters.filter(b => b !== booster);
        }
    }
}

function gameOver() {
    gameState = 'menu';
}

function displayHUD() {
    fill(255);
    let fontSize = min(24, 24 / scaleFactor);
    textSize(fontSize);
    textAlign(LEFT, TOP);

    let offsetX = rocket.position.x - width / 2  + 10 / scaleFactor;
    let offsetY = rocket.position.y - height / 2  + 40 / scaleFactor;
    let lineHeight = fontSize * 1.3; // Высота строки с учетом масштаба

    text(`Fuel: ${nf(fuel, 0, 2)}`, offsetX, offsetY);
    text(`Speed: ${nf(rocket.velocity.mag(), 0, 2)}`, offsetX, offsetY + lineHeight);
    text(`Scores: ${score}`, offsetX, offsetY + 2 * lineHeight);
    if (boosterEffectDuration > 0) {
        text(`Booster Effect: ${nf(boosterEffectDuration, 0, 2)}`, offsetX, offsetY + 3 * lineHeight);
        boosterEffectDuration -= 0.1;
    }

    text(`Global X: ${nf(rocket.position.x, 0, 2)}`, offsetX, offsetY + 5 * lineHeight);
    text(`Global Y: ${nf(rocket.position.y, 0, 2)}`, offsetX, offsetY + 4 * lineHeight);
}

function restartGame() {
    rocket = new Rocket();
    obstacles = [];
    boosters = [];
    fuel = 500;
    boosterEffectDuration = 0;
    thrusting = false;
    turningLeft = false;
    turningRight = false;
    gameState = 'playing';
    generateObstaclesAndBoostersAround(rocket.position.x, rocket.position.y, 3);
}