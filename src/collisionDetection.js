export default function detectCollision(ball, gameObject) {

    let bottomOfBall = ball.position.y + ball.size;
    let topOfBall = ball.position.y;

    let topOfObject = gameObject.position.y;
    let bottomOfObject = gameObject.position.y + gameObject.height;
    let leftSideObject = gameObject.position.x;
    let rightSideObject = gameObject.position.x + gameObject.width;

    return bottomOfBall >= topOfObject &&
        topOfBall <= bottomOfObject &&
        ball.position.x >= leftSideObject &&
        ball.position.x + ball.size <= rightSideObject;
}