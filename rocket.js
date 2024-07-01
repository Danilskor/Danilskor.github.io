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
