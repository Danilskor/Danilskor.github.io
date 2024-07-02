class Booster {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color(0, 255, 0);
    }

    display() {
        fill(this.color);
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
    }

    applyEffect(rocket) {
        rocket.velocity.mult(1.5);
        fuel += 50;
        boosterEffectDuration = 500;
    }
}