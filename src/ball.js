import detectCollision from "./collisionDetection.js"
import {randFloat} from "./utils.js"

export default class Ball {
    constructor(game) {
        this.image = document.getElementById('img-bal');
        this.size = 16;

        this.default_speed_x = 6;

        this.reset();

        this.game = game;

        this.bounds = {width: game.gameWidth, height: game.gameHeight};
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // Bound checks
        if (this.position.x + this.size > this.bounds.width || this.position.x < 0)
            this.speed.x = -this.speed.x;
        // bottom of game
        if (this.position.y + this.size > this.bounds.height) {
            this.game.lives--;
            this.reset();
        }
        if (this.position.y < 0)
            this.speed.y = -this.speed.y;

        // Paddle collision
        this.doPaddleCollision();
    }

    reset() {
        this.position = {x: 10, y: 400};
        this.speed = {x: this.default_speed_x, y: -4};
    }

    doPaddleCollision() {
        if (detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;

            let min = 0.5;
            let max = 1.7;

            // center
            let center_size = this.game.paddle.width / 5;

            let firstX = this.game.paddle.x + (this.game.paddle.width - center_size) / 2;
            let secondX = this.game.paddle.x + (this.game.paddle.width + center_size) / 2;

            if (firstX < this.position.x && this.position.x < secondX) {
                this.speed.x = -this.speed.x;
            } else
                this.speed.x = randFloat(min, max) * this.default_speed_x;

            this.game.audioHandler.playSound("shoot");
        }

    }
}