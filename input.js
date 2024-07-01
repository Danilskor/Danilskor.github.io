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
        let rectX = width / 2 - 90 * scaleFactor;
        let rectY = height / 2 - 50 * scaleFactor;
        let rectWidth = 180 * scaleFactor;
        let rectHeight = 100 * scaleFactor;

        if (mouseX > rectX && mouseX < rectX + rectWidth && mouseY > rectY && mouseY < rectY + rectHeight) {
            restartGame();
        }
    }
}

document.getElementById('thrust').addEventListener('touchstart', () => { thrusting = true; });
document.getElementById('thrust').addEventListener('touchend', () => { thrusting = false; });
document.getElementById('left').addEventListener('touchstart', () => { turningLeft = true; });
document.getElementById('left').addEventListener('touchend', () => { turningLeft = false; });
document.getElementById('right').addEventListener('touchstart', () => { turningRight = true; });
document.getElementById('right').addEventListener('touchend', () => { turningRight = false; });
