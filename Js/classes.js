class Sprite {
  constructor({
    position,
    imgSrc,
    scale = 1,
    frameMax = 1,
    framesHold = 65,
    cropOffset = {x:0, y:0,},
    sprites
  }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imgSrc;
    this.scale = scale;
    this.frameMax = frameMax;
    this.framesCurrent = 0;
    this.framesElepsed = 0;
    this.framesHold = framesHold;
    this.cropOffset = cropOffset
    this.sprites = sprites

    for(const sprit in this.sprites){
      this.sprites[sprit].image = new Image();
      this.sprites[sprit].image.src = this.sprites[sprit].imgSrc
    }
    
  }

  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.frameMax),
      0,
      this.image.width / this.frameMax,
      this.image.height,
      this.position.x - this.cropOffset.x,
      this.position.y - this.cropOffset.y,
      (this.image.width / this.frameMax) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrames(){
    this.framesElepsed++;
    if(this.framesElepsed % this.framesHold === 0){
        this.framesCurrent = (this.framesCurrent + 1) % this.frameMax
        this.framesElepsed = 0;
    }

  }

  update() {
    // Drawing Sprite
    this.draw();
    this.animateFrames();
  }
}

class Fighter extends Sprite {
  constructor({ position, velocity, color, offset, imgSrc,
    scale = 1,
    frameMax = 1,
    framesHold = 65,
    cropOffset = {x:0, y:0},
    sprites}
    ) {

    super({
      position,
      imgSrc,
      scale,
      frameMax,
      framesHold,
      cropOffset,
      sprites
    })

    this.velocity = velocity;
    this.color = color;
    this.width = 50;
    this.height = 150;
    this.lastKey = "";
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 220,
      height: 50,
      offset,
    };
    this.isAttacking = false;
    this.health = 100;
    this.speed = playerSpeed;
    this.framesCurrent = 0;
    this.framesElepsed = 0;
    this.dead = false;
  }

  update() {
    // Drawing Sprite
    this.draw();
    if(!this.dead) this.animateFrames();

    // Applying Movement
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.position.x = Math.max(this.position.x, 0);
    this.position.x = Math.min(this.position.x, 1024-this.width);

    // Applying Gravity
    if (this.position.y + this.height + this.velocity.y > canvas.height - 100) {
      this.velocity.y = 0;
      this.position.y = 327
    } else this.velocity.y += gravity;


    // Updating Attackbox
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
  }

  attack() {
    this.switchSprite("attack");
    setTimeout(() => {
      this.isAttacking = true;
    }, 250);
    setTimeout(() => {
      this.isAttacking = false;
    }, 350);
  }

  gotHit(){
    
    if(this.health <= 0) this.switchSprite("death");
    else this.switchSprite("takeHit");
  }


  switchSprite(sprite){

    if(this.image === this.sprites.death.image ) {
      if(this.framesCurrent === this.sprites.death.frameMax-1) this.dead = true;
      return
    }

    if(this.image === this.sprites.attack.image &&
      this.framesCurrent < this.sprites.attack.frameMax-1) return

    if(this.image === this.sprites.takeHit.image &&
      this.framesCurrent < this.sprites.takeHit.frameMax-1) return

    if (this.image !== this.sprites[sprite].image){
      this.image = this.sprites[sprite].image
      this.frameMax = this.sprites[sprite].frameMax
      this.framesHold = this.sprites[sprite].framesHold
      this.framesCurrent = 0
    }
  }
}
