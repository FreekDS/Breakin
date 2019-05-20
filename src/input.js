export default class InputHandler{
    constructor(paddle){
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