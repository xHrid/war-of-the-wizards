
const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

const slider = document.getElementById("myRange");

let fps = 1

canvas.width = 1024
canvas.height = 576
bgcolor = "black"

let playerSpeed = 3 * fps;
let damage = 20

c.fillRect(0, 0, canvas.width, canvas.height)
let gravity = 0.3 * fps
let gameOver = false;


// Key Pressed

let pressed = {
    a:false,
    d:false,
    arrowLeft:false,
    arrowRight:false
}


// Event Listners

window.addEventListener("keydown", event => {
    if(!player.dead)
        switch(event.key){
            case 'a':
                pressed.a = true;
                player.lastKey = 'a'
                break;
            case 'd':
                pressed.d = true;
                player.lastKey = 'd'
                break;
            case 'w':
                player.velocity.y = -10 * fps
                break;
            case 's':
                player.attack()
                break;
        }

    if(!enemy.dead)
        switch(event.key){
            case 'ArrowLeft':
                pressed.arrowLeft = true;
                enemy.lastKey = 'ArrowLeft'
                break;
            case 'ArrowRight':
                pressed.arrowRight = true;
                enemy.lastKey = 'ArrowRight'
                break;
            case 'ArrowUp':
                enemy.velocity.y = -10 * fps
                break;
            case 'ArrowDown':
                enemy.attack();
                break;
        }
})

window.addEventListener("keyup", event => {
    switch(event.key){
        case 'a':
            pressed.a = false;
            break;
        case 'd':
            pressed.d = false;
            break;
        case 'ArrowLeft':
            pressed.arrowLeft = false;
            break;
        case 'ArrowRight':
            pressed.arrowRight = false;
            break;
    }
})

// Slider Event Listner

slider.addEventListener("click", ()=> {

    if(slider.value < 0){
        fps = 1/Math.abs(slider.value);
    } else if (slider.value > 0){
        fps = slider.value;
    } else fps = 1

    
    gravity = 0.3 * fps
    tree.framesHold = 65/fps
    rocks.framesHold = 65/fps

    player.framesHold = 20/fps
    player.speed = 3*(fps/1.2)

    for(const sprite in player.sprites){
        player.sprites[sprite].framesHold = Math.round(playerSpriteFramMax[sprite].frameHold/fps);
    }

    enemy.framesHold = 15/fps
    enemy.speed = 3*(fps/1.2)

    for(const sprite in enemy.sprites){
        enemy.sprites[sprite].framesHold = Math.round(enemySpriteFramMax[sprite].frameHold/fps);
    }

    console.log(fps)
})

// background

background = new Sprite({
    position:{
        x:0, 
        y:0
    },
    imgSrc: "./imgs/background.png"
    
})

tree = new Sprite({
    position:{
        x:627, 
        y:197
    },
    imgSrc: "./imgs/tree.png", 
    scale: 2.5,
    frameMax: 6,
    framesHold: 65/fps
})

rocks = new Sprite({
    position:{
        x:0,
        y:100
    },
    imgSrc:"./imgs/rock.png",
    scale:1.5,
    frameMax: 6,
    framesHold: 65/fps
})


const playerSpriteFramMax = {
    idle:{
        frameHold:15
    },
    run:{
        frameHold:10
    },
    jump:{
        frameHold:15
    },
    fall:{
        frameHold:15
    },
    attack:{
        frameHold:10
    },
    takeHit:{
        frameHold:10
    },
    death:{
        frameHold:15
    }
}

// Creating Player Object
player = new Fighter({
    position:{
        x:0,
        y:0
    }, 
    velocity:{
        x:0, 
        y:0
    },
    color:"red",
    offset:{
        x:0,
        y:0
    },
    imgSrc: "./imgs/wiz_1/Idle.png",
    frameMax: 6,
    framesHold: 20/fps,
    scale: 1.5,
    cropOffset:{
        x:115,
        y:65
    },
    sprites: {
        idle:{
            imgSrc: "./imgs/wiz_1/Idle.png",
            frameMax: 6,
            framesHold: 15
        },
        run:{
            imgSrc: "./imgs/wiz_1/Run.png",
            frameMax: 8,
            framesHold: 10
        },
        jump:{
            imgSrc: "./imgs/wiz_1/Jump.png",
            frameMax: 2,
            framesHold: 15
        },
        fall:{
            imgSrc: "./imgs/wiz_1/Fall.png",
            frameMax: 2,
            framesHold: 15
        },
        attack:{
            imgSrc: "./imgs/wiz_1/Attack2.png",
            frameMax: 8,
            framesHold: 10
        },
        takeHit:{
            imgSrc: "./imgs/wiz_1/Hit.png",
            frameMax: 4,
            framesHold: 10
        },
        death:{
            imgSrc: "./imgs/wiz_1/Death.png",
            frameMax: 7,
            framesHold: 15
        }
    }
    
})

// Creating Emeny Object

const enemySpriteFramMax = {
    idle:{
        frameHold:15
    },
    run:{
        frameHold:10
    },
    jump:{
        frameHold:15
    },
    fall:{
        frameHold:15
    },
    attack:{
        frameHold:10
    },
    takeHit:{
        frameHold:7
    },
    death:{
        frameHold:10
    }
}

enemy = new Fighter({
    position:{
        x:800,
        y:0
    }, 
    velocity:{
        x:0, 
        y:0
    },
    color:"blue",
    offset:{
        x:-180,
        y:0
    },
    imgSrc: "./imgs/wiz_2/Idle.png",
    frameMax: 8,
    framesHold: 15/fps,
    scale: 2.2,
    cropOffset:{
        x:300,
        y:220
    },

    sprites: {
        idle:{
            imgSrc: "./imgs/wiz_2/Idle.png",
            frameMax: 8,
            framesHold: 15
        },
        run:{
            imgSrc: "./imgs/wiz_2/Run.png",
            frameMax: 8,
            framesHold: 10
        },
        jump:{
            imgSrc: "./imgs/wiz_2/Jump.png",
            frameMax: 2,
            framesHold: 15
        },
        fall:{
            imgSrc: "./imgs/wiz_2/Fall.png",
            frameMax: 2,
            framesHold: 15
        },
        attack:{
            imgSrc: "./imgs/wiz_2/Attack1.png",
            frameMax: 8,
            framesHold: 10
        },
        takeHit:{
            imgSrc: "./imgs/wiz_2/Hit.png",
            frameMax: 3,
            framesHold: 10
        },
        death:{
            imgSrc: "./imgs/wiz_2/Death.png",
            frameMax: 7,
            framesHold:10
        }
    }

})

// Timer

let time = 50;
const displayLable = document.querySelector("#displayLabel");
displayLable.textContent = time;

const timer = setInterval(()=>{
    if (time<=0) clearInterval(timer);
    document.querySelector("#timer").textContent = time;
    time--;
}, 1000)


// Game Loop
function animate(){
    let animation = window.requestAnimationFrame(animate);

    // Resetting Canvas
    c.fillStyle = bgcolor
    c.fillRect(0, 0, canvas.width, canvas.height)

    background.update()
    tree.update()
    rocks.update()

    c.fillStyle = "rgb(255, 255, 255, 0.1)"
    c.fillRect(0, 0, canvas.width, canvas.height)

    enemy.update()
    player.update()

    
    // Player Movement 

    player.velocity.x = 0

    if (pressed.a && player.lastKey == 'a'){
        player.velocity.x = -player.speed                         
        player.switchSprite("run");
    } else if (pressed.d && player.lastKey == 'd'){
        player.velocity.x = player.speed
        player.switchSprite("run");
    } else player.switchSprite("idle");
    

    if(player.velocity.y < 0) player.switchSprite("jump");
    else if (player.velocity.y > 0) player.switchSprite("fall");

    

    // Enemy Movement 
    
    enemy.velocity.x = 0

    if (pressed.arrowLeft && enemy.lastKey == 'ArrowLeft'){
        enemy.velocity.x = -enemy.speed
        enemy.switchSprite("run")


    } else if (pressed.arrowRight && enemy.lastKey == 'ArrowRight'){
        enemy.velocity.x = enemy.speed
        enemy.switchSprite("run")

    } else enemy.switchSprite("idle");

    if(enemy.velocity.y < 0) enemy.switchSprite("jump")
    else if (enemy.velocity.y > 0) enemy.switchSprite("fall")

    // Player Attack

    if (collisionDetection(player.attackBox, enemy) && player.isAttacking){
        console.log("Player Attacked");
        player.isAttacking = false;

        if(!enemy.dead)enemy.position.x += 100

        enemy.health -= damage

        gsap.to("#enemy_health", {
            width: enemy.health + "%"
        })

        enemy.gotHit();
        

        
    }

    // Enemy Attack

    if (collisionDetection(player, enemy.attackBox) && enemy.isAttacking){
        console.log("Enemy Attacked");
        enemy.isAttacking = false;

        if(!player.dead)player.position.x -= 100
        player.health -= damage
        player.gotHit()

        gsap.to("#player_health", {
            width: player.health + "%"
        })
        
        
    }

    // Timer Check

    if ((time <= 0 || player.health <= 0 || enemy.health <= 0) && !gameOver){
        endGame();
    }

    // FPS

    



}

animate()