import Paddle from "./paddle.js";
import Ball from "./bal.js";
import InputHandler from "./input.js";
import {level1, buildLevel} from "./levels.js";

export default class Game {
    constructor(gamewidth, gameHeight) {
        this.gameWidth = gamewidth;
        this.gameHeight = gameHeight;
    }

    start() {
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);


        this.gameObjects = [
            this.ball,
            this.paddle,
            ...buildLevel(this, level1)
        ];

        new InputHandler(this.paddle);
    }

    update(deltaTime) {
        this.gameObjects.forEach((object) => object.update(deltaTime));

        this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion);
    }

    draw(ctx) {
        this.gameObjects.forEach((object) => object.draw(ctx));
    }

}