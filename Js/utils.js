// Collision Detection

function collisionDetection(rect1, rect2){
    return (rect1.position.x + rect1.width >= rect2.position.x &&
            rect1.position.x <= rect2.position.x + rect2.width &&
            rect1.position.y + rect1.height >= rect2.position.y &&
            rect1.position.y <= rect2.position.y + rect2.height)
}


function endGame(){
    gameOver = true;
    time = 0;
    displayLable.style.display = "flex"
    if(player.health === enemy.health){
        displayLable.textContent = "Tie";
    } else if (enemy.health > player.health){
        displayLable.textContent = "Player 2 Won";
    }
    else {
        displayLable.textContent = "Player 1 won"
    }
}

function changeAnimation(_player, animation){
    _player.image = _player.sprites[animation].image                
    _player.frameMax = _player.sprites[animation].frameMax
    _player.framesHold = _player.sprites[animation].framesHold
}