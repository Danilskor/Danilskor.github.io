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

document.getElementById('thrust').addEventListener('touchstart', () => { thrusting = true; });
document.getElementById('thrust').addEventListener('touchend', () => { thrusting = false; });
document.getElementById('left').addEventListener('touchstart', () => { turningLeft = true; });
document.getElementById('left').addEventListener('touchend', () => { turningLeft = false; });
document.getElementById('right').addEventListener('touchstart', () => { turningRight = true; });
document.getElementById('right').addEventListener('touchend', () => { turningRight = false; });
