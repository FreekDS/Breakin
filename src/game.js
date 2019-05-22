import Paddle from "./paddle.js";
import Ball from "./ball.js";
import InputHandler from "./input.js";
import {level1, level2, buildLevel} from "./levels.js";

export const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAME_OVER: 3,
    CHANGE_LEVEL: 4,
    VICTORY: 5
};


export default class Game {
    constructor(gamewidth, gameHeight) {
        this.gameWidth = gamewidth;
        this.gameHeight = gameHeight;

        this.gameState = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.bricks = [];
        this.levels = [level1, level2];


        this.lives = 3;
        this.currentLevel = 0;

        new InputHandler(this.paddle, this);
    }


    start() {

        if (this.gameState !== GAMESTATE.MENU && this.gameState !== GAMESTATE.CHANGE_LEVEL) return;

        this.bricks = [...buildLevel(this, this.levels[this.currentLevel])];

        this.ball.reset();

        this.gameObjects = [
            this.ball,
            this.paddle
        ];

        this.gameState = GAMESTATE.RUNNING;
    }

    update(deltaTime) {

        if (this.lives <= 0) this.gameState = GAMESTATE.GAME_OVER;

        switch (this.gameState) {
            case GAMESTATE.PAUSED || GAMESTATE.MENU || GAMESTATE.GAME_OVER:
                return;
            case GAMESTATE.RUNNING:
                [...this.gameObjects, ...this.bricks].forEach((object) => object.update(deltaTime));
                this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);

                if (this.bricks.length === 0) {
                    this.currentLevel++;
                    if (this.currentLevel >= this.levels.length)
                        this.gameState = GAMESTATE.VICTORY;
                    else
                        this.gameState = GAMESTATE.CHANGE_LEVEL;
                    this.start();
                }
        }
    }

    draw(ctx) {

        switch (this.gameState) {
            case GAMESTATE.RUNNING:
                [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));
                ctx.font = "15px Arial";
                ctx.fillStyle = "black";
                ctx.textAlign = "left";
                ctx.fillText("Lives: " + this.lives.toString(), 10, 20);
                break;
            case GAMESTATE.PAUSED:
                ctx.fillStyle = "rgb(10,10,10, 0.5)";
                ctx.rect(0, 0, this.gameWidth, this.gameHeight);
                ctx.fill();

                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
                break;
            case GAMESTATE.MENU:
                ctx.fillStyle = 'rgb(1,1,1,1)';
                ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("Press SPACE to play", this.gameWidth / 2, this.gameHeight / 2);
                break;
            case GAMESTATE.GAME_OVER:
                ctx.fillStyle = 'rgb(1,1,1,1)';
                ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("GAME OVER!", this.gameWidth / 2, this.gameHeight / 2);
                break;
            case GAMESTATE.VICTORY:
                ctx.fillStyle = "rgba(255,0,0, 0.5)";
                ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("You won!", this.gameWidth / 2, this.gameHeight / 2);
                break;

        }
    }

    togglePause() {
        if (this.gameState === GAMESTATE.PAUSED)
            this.gameState = GAMESTATE.RUNNING;
        else if (this.gameState === GAMESTATE.RUNNING) {
            this.gameState = GAMESTATE.PAUSED;
        }
    }

}