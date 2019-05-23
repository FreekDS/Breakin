import Game from './game.js'

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
// game.audioHandler.playTheme(game.currentTheme);

let lastTime = 0;
function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    game.update(deltaTime);

    ctx.clearRect(0,0, GAME_WIDTH, GAME_HEIGHT);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();

window.onload = function setup() {
    game.audioHandler.playTheme(game.currentTheme);
};