class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, enemyName, xposition, ypostion) {
        //this.type = Phaser.Math.RND.pick(['normal', 'gooey', 'runny']);
        //console.log('expected object is:'+type);
        // call Phaser Physics Sprite constructor
        super(scene, xposition, ypostion, enemyName); 

        this.scene = scene;

        //console.log(this.timer);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);

        this.name = enemyName;
        this.setDrag(100,100);
        this.setCollideWorldBounds(true);
        //this.body.immovable = true;
        
        this.valid			= true;
        this.attacking = false;
        this.follow = false;
        this.immune = false;										
		//this.x				= xposition - (this.width/2);							
		//this.y				= xposition - (this.height/2);							
        this.move			= enemyData[enemyName]["move"];					
        this.health         = enemyData[enemyName]["health"];	
        this.range		= enemyData[enemyName]["range"];
        this.interval		= enemyData[enemyName]["interval"];
		this.lv				= enemyData[enemyName]["lv"];						
		this.exp			= enemyData[enemyName]["exp"];					
		
		
		this.velocityX		= 0;
		this.velocityY		= 0;
		this.nextMove		= 0;
		
		
        //this.nextMove = getRandInt(this.move.length);
        this.nextMove = Phaser.Math.RND.integerInRange(0, this.move.length-1);
        
        console.log(this.move);
        console.log("nextMove:"+this.nextMove);

        // this.basicTween = this.scene.tweens.add({
        //     targets: this,
        //     angle: { from: 0, to: 360 }
        // });

        //if(this.valid){
        this.playerCD = this.scene.time.addEvent();
        this.yokaiCD = this.scene.time.addEvent();
        this.gameTimer = this.scene.time.addEvent({
            delay: this.interval,
            callback: ()=>{
                
                 this.velocityX = this.move[this.nextMove][0];
                this.velocityY = this.move[this.nextMove][1];
                //console.log(this.velocityX);
                
                this.nextMove++;
                if(this.nextMove >= this.move.length){
                    this.nextMove = 0;
                }
                if(this.name == 'firewheel') {
                    if(this.velocityX > 0)
                        this.angle += 1;
                    else
                        this.angle -= 1;
                }
                if(this.velocityX > 0)
                    this.setFlip(true,false);
                else
                    this.setFlip(false,false);
                
                    
                // this.x += this.velocityX;
                // this.y += this.velocityY;
                this.body.setVelocity(this.velocityX*2, this.velocityY*2);
                this.anims.play(this.name+"_walk");
            },
            callbackScope: this,
            loop: true,
            //timeScale: 0.1
        });
        
        this.setImmovable();
        //console.log(this.body);
    //}

    }

    update() {
        // override physics sprite update()
        super.update();
        if(Phaser.Math.Distance.BetweenPoints(peachGirl, this)<this.range){
            this.attacking = true;
        }
        if(this.health <= 0) {
            peachGirl.addExp(this.exp);
            let img = this.exp+"exp"
            let realexp = this.scene.add.sprite(this.x, this.y+50, img).setScale(2);
            this.scene.time.addEvent({ 
                delay: 300, 
                callback: ()=>{
                    realexp.y -= 5;
                }, 
                callbackScope: this.scene, 
                repeat: 3
            });
            this.scene.time.delayedCall(2000, () => { realexp.destroy(); });

            this.alpha = 0;
            this.follow = false;
            let boom = this.scene.add.sprite(this.x, this.y, 'death').setOrigin(0.5, 0.5);
            console.log(boom);
            boom.anims.play('death', true);           // play explode animation
            boom.on('animationcomplete', () => {  // callback after animation completes
                boom.destroy();                    // remove explostion sprite
            });
            this.destroy();
            this.gameTimer.remove();
        }
        if(this.name == 'firewheel') {
            if(this.velocityX > 0 || this.velocityY > 0)
                this.angle += 1;
            else if(this.velocityX < 0 || this.velocityY < 0)
                this.angle -= 1;
            
        }
       //console.log(this.body);
        //this.scene.physics.arcade.distanceToObject(peachGirl, this)
        if(this.name == 'oxheaded'){
            //console.log(Phaser.Math.Distance.BetweenPoints(peachGirl, this));
            if(Phaser.Math.Distance.BetweenPoints(peachGirl, this)<400){
                
                this.gameTimer.paused = true;
                this.follow = true;
                if(this.follow){
                    this.scene.physics.moveToObject(this, peachGirl, 20);
                }
                
                if(this.velocityX > 0)
                    this.setFlip(true,false);
                else
                    this.setFlip(false,false);
                if(Phaser.Math.Distance.BetweenPoints(peachGirl, this)<=this.range) {
                    this.yokaiattack = this.scene.time.addEvent({
                        delay: this.interval,
                        callback: ()=>{
                            
                            this.attacking = true;
                            this.anims.play(this.name+"_attack", true);
                        },
                        callbackScope: this,
                        loop: true,
                        //timeScale: 0.1
                    });
                }else {
                    this.attacking = false;
                    this.anims.chain(this.name+"_walk");
                    //this.anims.play(this.name+"_walk");
                }
                    
                    //this.anims.play(this.name+"_walk");
                    //this.yokaiattack.remove();
                                  
                // else
                //     this.anims.stop(this.name+"_attack");

            }else{
                //this.anims.stop();
            this.gameTimer.paused = false;
            this.anims.play(this.name+"_walk");
            }

        }
        //console.log(peachGirl.valid);
        // yokai collision detection
        if(keys.Z.isDown && this.valid) {
            //console.log("should be here");
            this.scene.physics.world.overlap(peachGirl, this, this.playerCollision, null, this.scene);
            //this.scene.time.delayedCall(1000, () => { this.immune = false; });
            this.valid = false;
            
            
        }else if(keys.Z.isUp && this.attacking) {
            //console.log("here");
            this.scene.physics.world.overlap(this, peachGirl, this.yokaiCollision, null, this.scene);
            //this.scene.time.delayedCall(1000, () => { peachGirl.immune = false; });
            this.valid = true;
        }

        
        
        // // add new barrier when existing barrier hits center X
        // if(this.newBarrier && this.x < centerX) {
        // //if(this.newBarrier) {
        //     this.newBarrier = false;
        //     // call parent scene method from this context
        //     this.scene.addBarrier(this.parent, this.velocity);
        // }

        // // destroy paddle if it reaches the left edge of the screen
        // if(this.x < -this.width) {
        //     this.destroy();
        // }
    }

    playerCollision(peachGirl, yokai) {
        //yokai.disableBody(true, true);
        //console.log("madddddddd");
        // console.log(yokai.body.touching);
        // //yokai.setBounce(0.5);
        // if(yokai.body.touching.left) {
        // 	enemy.body.velocity.x = 256;
        // } else if (yokai.body.touching.right) {
        // 	yokai.body.velocity.x = -256;
        // } else if (yokai.body.touching.up) {
        // 	yokai.body.velocity.y = 256;	
        // } else if (yokai.body.touching.down) {
        // 	yokai.body.velocity.y = -256;
        // }if(yokai.name == 'boss')
        //console.log(this.keys);
            console.log(yokai.health);
            
                if(yokai.immune == false) {
                    yokai.health--;
                    if(yokai.body.touching.down) {
                
                        yokai.body.velocity.y = Phaser.Math.Between(-300, -200);
                        yokai.body.velocity.x = Phaser.Math.Between(-128, 128);
                        
                        // yokai.body.velocity.y = -200;
                        // yokai.body.velocity.x = -200;
                    } else if (yokai.body.touching.up) {
                        yokai.body.velocity.y = Phaser.Math.Between(200, 300);
                        yokai.body.velocity.x = Phaser.Math.Between(-128, 128);
                    } else if (yokai.body.touching.right) {
                        yokai.body.velocity.x = Phaser.Math.Between(-300, -228);
                        //console.log(yokai.body.velocity.x);
                        yokai.body.velocity.y = Phaser.Math.Between(-200, 200);
                        
                    } else if (yokai.body.touching.left) {
                        yokai.body.velocity.x = Phaser.Math.Between(228, 350);
                        yokai.body.velocity.y = Phaser.Math.Between(-200, 200);
                    }
                }
                    
                yokai.immune = true;
                yokai.yokaiCD.remove();
                yokai.yokaiCD = yokai.scene.time.addEvent({
                    delay: 1000,
                    callback: ()=>{
                        yokai.immune = false;
                    },
                    callbackScope: this
                    //loop: true,
                    //timeScale: 0.1
                });
        //         console.log("peachGirl.immune:"+peachGirl.immune);
        // console.log("yokai.immune:"+yokai.immune);
            
        
            //console.log("life: "+peachGirl.life+"  Elife: "+yokai.health);
            console.log("Player:"+peachGirl.life+" immune:"+peachGirl.immune+"\nyokai:"+yokai.health+" immune:"+yokai.immune);
            
        }

    yokaiCollision(yokai, peachGirl) {
        if(peachGirl.immune == false) {
            peachGirl.life--;
            //peachGirl.tint(0xFF0000);
            console.log(peachGirl.tint);
            //yokai.playerCD.remove();

            //yokai.scene.time.delayedCall(500, () => { this.body.setSize(32,64,true); });
            if(peachGirl.body.touching.down) {
            
                peachGirl.body.velocity.y = Phaser.Math.Between(-300, -200);
                        peachGirl.body.velocity.x = Phaser.Math.Between(-128, 128);
                
                // peachGirl.body.velocity.y = -200;
                // peachGirl.body.velocity.x = -200;
            } else if (peachGirl.body.touching.up) {
                peachGirl.body.velocity.y = Phaser.Math.Between(200, 300);
                        peachGirl.body.velocity.x = Phaser.Math.Between(-128, 128);
            } else if (peachGirl.body.touching.right) {
                peachGirl.body.velocity.x = Phaser.Math.Between(-300, -228);
                        //console.log(peachGirl.body.velocity.x);
                        peachGirl.body.velocity.y = Phaser.Math.Between(-200, 200);
                    
            } else if (peachGirl.body.touching.left) {
                peachGirl.body.velocity.x = Phaser.Math.Between(228, 350);
                peachGirl.body.velocity.y = Phaser.Math.Between(-200, 200);
            }
        }
                
        peachGirl.immune = true;
        //console.log(yokai.timer);

        // console.log("peachGirl.immune:"+peachGirl.immune);
        // console.log("yokai.immune:"+yokai.immune);
        //console.log(game.time.events);
        yokai.playerCD.remove();
        yokai.playerCD = yokai.scene.time.addEvent({
            delay: 1000,
            callback: ()=>{
                peachGirl.immune = false;
            },
            callbackScope: this
            //loop: true,
            //timeScale: 0.1
        });
            
    }
}