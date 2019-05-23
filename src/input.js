export default class InputHandler {
    constructor(paddle, game) {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                default:
                    break;
                case 'ArrowRight':
                    if (game.isPlaying())
                        paddle.moveRight();
                    if (game.inMenu())
                        game.nextTheme();
                    break;
                case 'ArrowLeft':
                    if (game.isPlaying())
                        paddle.moveLeft();
                    if (game.inMenu()) {
                        game.prevTheme();
                    }
                    break;
                case 'Escape':
                    game.togglePause();
                    break;
                case ' ':
                    if (game.stopped()) {
                        game.restart();
                    } else
                        game.start();
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                default:
                    break;
                case 'ArrowRight':
                    if (paddle.speed > 0)
                        paddle.stopMoving();
                    break;
                case 'ArrowLeft':
                    if (paddle.speed < 0)
                        paddle.stopMoving();
                    break;

            }
        });

    }
}