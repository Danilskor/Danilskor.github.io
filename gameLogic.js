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