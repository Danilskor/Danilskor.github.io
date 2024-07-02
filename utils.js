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

let dificultyScaleThreshold = -5000;

function generateObstaclesInCell(cellX, cellY) {
    let obstaclesInCell = [];
    let baseX = cellX * width;
    let baseY = cellY * height;
    let numObstacles = baseY / dificultyScaleThreshold;

    for (let i = 0; i < numObstacles; i++) {
        let x = random(baseX, baseX + width);
        let y = random(baseY, baseY + height);

        if (y > dificultyScaleThreshold) {
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

        if (y > 0 ) {
            continue;
        }

        let newBooster = new Booster(x, y, 20, 20);
        boostersInCell.push(newBooster);
    }

    return boostersInCell;
}


function drawBackground(y) {
    noFill();
    let skyColor = color(0, 0, 0);

    if (y > -5000) {
        // Near the ground
        skyColor = lerpColor(color(185, 255, 255), color(135, 206, 235), (y + 5000) / 5000);
    } else if (y > -10000) {
        // Cloudy sky
        skyColor = lerpColor(color(135, 206, 235), color(185, 255, 255), (y + 10000) / 5000);
    } else if (y > -15000) {
        // Space
        skyColor = lerpColor(color(0, 0, 0), color(135, 206, 235), (y + 15000) / 5000);
    }

    background(skyColor);
    
    if (y <= -5000 && y > -12000) {
        drawClouds();
    } else if (y <= -12000) {
        drawStars();
    }

}


function drawGround() {
    fill(34, 139, 34);
    rect(rocket.position.x + width / 2 / scaleFactor, height / 4, width * 4,  height / 2);
}

function generateClouds(numClouds) {
    for (let i = 0; i < numClouds; i++) {
        clouds.push({
            x: random(-width, width * 2),
            y: random(-6000, -10000),
            size: random(30, 100)
        });
    }
}

function drawClouds() {
    fill(255, 255, 255, 150);
    noStroke();
    for (let cloud of clouds) {
        let x = (cloud.x - rocket.position.x + width / 2) % (width * 3);
        let y = (cloud.y - rocket.position.y + height / 2);
        ellipse(x, y, cloud.size, cloud.size);
    }
}

function generateStars(numStars) {
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: random(-width, width * 2),
            y: random(-15000, -20000),
            size: random(1, 3)
        });
    }
}

function drawStars() {
    fill(255);
    noStroke();
    for (let star of stars) {
        let x = (star.x - rocket.position.x + width / 2) % (width * 3);
        let y = (star.y - rocket.position.y + height / 2) % (height * 3);
        ellipse(x, y, star.size, star.size);
    }
}