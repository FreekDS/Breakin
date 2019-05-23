export default function detectCollision(ball, gameObject) {

    let bottomOfBall = ball.position.y + ball.size;
    let topOfBall = ball.position.y;

    let topOfObject = gameObject.position.y;
    let bottomOfObject = gameObject.position.y + gameObject.height;
    let leftSideObject = gameObject.position.x;
    let rightSideObject = gameObject.position.x + gameObject.width;

    let hitBot = topOfBall <= bottomOfBall;
    let hitTop = bottomOfBall >= topOfBall;
    let hitRight = ball.position.x >= leftSideObject;
    let hitLeft = ball.position.x <= rightSideObject;


    let collision = bottomOfBall >= topOfObject &&
        topOfBall <= bottomOfObject &&
        ball.position.x >= leftSideObject &&
        ball.position.x + ball.size <= rightSideObject;


    // hit the brick on bottom
    // if(topOfBall <= bottomOfObject && hitLeft && hitRight) {
    //     ball.position.y = bot;
    //     return true;
    // }
    // //hit the brick on top
    // if(bottomOfBall >= topOfObject){
    //     ball.position.y = topOfObject;
    //     return true;
    // }
    // //hit the brick on the left side
    // if(hitRight && hitBot && hitTop){
    //     ball.position.x = leftSideObject
    //     return true;
    // }
    // if(hitLeft && hitBot && hitTop){
    //    ball.position.x = rightSideObject;
    // }


    return collision;

}