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