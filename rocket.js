class Rocket {
    constructor() {
        this.position = createVector(width / 2 / scaleFactor, 0);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.angle = 0;
    }

    applyThrust() {
        if (this.velocity.mag() < maxEngineSpeed || boosterEffectDuration > 0) {
            let force = p5.Vector.fromAngle(this.angle - PI / 2);
            force.mult(thrust);
            this.acceleration.add(force);
        }
    }

    turn(angle) {
        this.angle += angle;
    }

    update() {
        let gravityForce = createVector(0, gravity);
        this.acceleration.add(gravityForce);

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.set(0, 0);

        if (this.position.y > 0) {
            this.position.y = 0;
            this.velocity.y = 0;
            this.velocity.x = 0;
        }
    }

    display() {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        fill(150);
        rectMode(CENTER);
        rect(0, 0, 30, 50);
        pop();
    }

    hits(obstacle) {
        let d = dist(this.position.x, this.position.y, obstacle.x, obstacle.y);
        return d < 25 + obstacle.w / 2;
    }

    collects(booster) {
        let d = dist(this.position.x, this.position.y, booster.x, booster.y);
        return d < 25 + booster.w / 2;
    }
}