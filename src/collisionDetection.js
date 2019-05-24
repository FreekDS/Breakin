export default function detectCollision(ball, gameObject, paddle=false) {

    // Positions of the ball
    let bottomOfBall = ball.position.y + ball.size;
    let topOfBall = ball.position.y;
    let leftOfBall = ball.position.x;
    let rightOfBall = ball.position.x + ball.size;

    // Positions of the object
    let topOfObject = gameObject.position.y;
    let bottomOfObject = gameObject.position.y + gameObject.height;
    let leftSideObject = gameObject.position.x;
    let rightSideObject = gameObject.position.x + gameObject.width;

    // Collision checks
    let checkBot = topOfBall <= bottomOfObject;
    let checkTop = bottomOfBall >= topOfObject;
    let checkRight = rightOfBall >= leftSideObject;
    let checkLeft = leftOfBall <= rightSideObject;

    let collision = checkBot && checkTop && checkLeft && checkRight;

    if(paddle){
        return collision;
    }

    // Check if ball in a the radius of the width resp height
    let inWidth = leftOfBall >= leftSideObject && rightOfBall <= rightSideObject;
    let inHeight = bottomOfObject <= bottomOfObject && topOfObject >= topOfObject;

    // Update on collision
    if (collision) {
        if (inHeight && !inWidth) {
            ball.speed.x = -ball.speed.x;
            // hit left
            if (rightOfBall < rightSideObject)
                ball.position.x = leftSideObject - ball.size;
            // hit right
            else
                ball.position.x = rightSideObject;
        } else {
            ball.speed.y = -ball.speed.y;
            // hit on bottom
            if (topOfBall > topOfObject)
                ball.position.y = gameObject.position.y + gameObject.height;
            // hit on top
            else
                ball.position.y = gameObject.position.y - ball.size;

        }
    }

    return collision;
}