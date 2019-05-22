import detectCollision from "./collisionDetection.js"

export default class Ball {
    constructor(game) {
        this.image = document.getElementById('img-bal');
        this.size = 16;

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
        if (detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }
    }

    reset(){
        this.position = {x: 10, y: 400};
        this.speed = {x: 6, y: -4};
    }
}