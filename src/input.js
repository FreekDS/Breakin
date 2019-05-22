export default class InputHandler{
    constructor(paddle, game){
        document.addEventListener('keydown', (event) =>{
            switch (event.key) {
                default:
                    break;
                case 'ArrowRight':
                    paddle.moveRight();
                    break;
                case 'ArrowLeft':
                    paddle.moveLeft();
                    break;
                case 'Escape':
                    game.togglePause();
                    break;
                case ' ':
                    game.start();
            }
        });

        document.addEventListener('keyup', (event) =>{
            switch (event.key) {
                default:
                    break;
                case 'ArrowRight':
                    if(paddle.speed > 0)
                        paddle.stopMoving();
                    break;
                case 'ArrowLeft':
                    if(paddle.speed < 0)
                        paddle.stopMoving();
                    break;

            }
        });

    }
}