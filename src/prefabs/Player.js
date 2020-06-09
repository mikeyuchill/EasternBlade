class Player extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, xposition, ypostion) {
       //this.type = Phaser.Math.RND.pick(['normal', 'gooey', 'runny'])
       // call Phaser Physics Sprite constructor
       super(scene, xposition, ypostion, 'PeachGirl_idle', 'PeachGirl_idle0'); 

       
      //console.log('object is:'+type);
        this.scene = scene;
        this.gametime = null;
        // let frame = this.scene.textures.getFrame('PeachGirl', 'PeachGirl');
        // this.demo = this.scene.add.graphics({
        //     x: this.x - this.width / 2,
        //     y: this.y - this.height / 2
        //   }).fillStyle(0xff0000, 0.75)
        //   .setTexture('PeachGirl', 'PeachGirl', 1)
        //   .fillRect(frame.x, frame.y, frame.cutWidth, frame.cutHeight);
        //this.peach.alpha = 0;
        //this.UIscene = UIscene;
        //console.log(that)
        //console.log('object is:'+Phaser.Physics.Arcade.Sprite.texture);
        // set up physics sprite
        this.currentRoom = 6;       // Set start room so room change flag doens't fire.
        this.previousRoom = null;
        this.roomChange = false;
        this.canMove = true;
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true);
        //this.setVelocityX(velocity);            // make it go!
        keys = scene.input.keyboard.addKeys('Z,X,A,D,UP,LEFT,RIGHT,DOWN,SPACE');
        this.setImmovable();                   
       //this.tint = Math.random() * 0xFFFFFF;   // randomize tint
       //this.speed = playerSpeed;
       this.onEdges = false;
       this.playerCD = this.scene.time.addEvent();
		
		this.lv			= 1;
        this.exp		= 0;
        this.attack     = 20;
        this.defense    = 25;
        this.recovery   = 20;
        this.consumption = 0.05;
        
        
        this.valid = true;
        this.weapon = null;
        this.attacking = false;
        this.immune = false;
        this.isStun = false;
        this.dodged = false;
        this.speed = 200;
        this.maxStep = 100;
        this.maxLife = 12;
        this.life = this.maxLife;
        
        this.airimmunity = false;
        this.earthimmunity = false;
        this.fireimmunity = false;
        this.lightningimmunity = false;
        this.moonimmunity = false;
        this.poisonimmunity = false;
        this.waterimmunity = false;

        this.steps = scene.add.text(160, 85, `${this.maxStep}  Steps`, { fontFamily: 'Freckle Face', fontSize: '36px', color: '#000' });
        

        // this.anims.create({ 
        //     key: 'walk', 
        //     frames: this.anims.generateFrameNames('platformer_atlas', {      
        //         prefix: 'walk',
        //         start: 1,
        //         end: 11,
        //         suffix: '',
        //         zeroPad: 4 
        //     }), 
        //     frameRate: 30,
        //     repeat: -1 
        // });

   }

   update() {
       // override physics sprite update()
       super.update();
       this.life = Math.min(this.life, 12);
       //console.log(this.life);
       this.body.setVelocity(0);
       
       
        
        if(moveBar.value > 0 && this.life > 0 && !this.isStun) {
    //     // check for player input
    //     if(cursors.up.isDown && this.valid) {
    //         this.body.y -= 64;
    //         //peachGirl.setVelocityY(-20);
    //         this.valid = false;
    //         this.maxStep--;
    //     } else if(cursors.down.isDown && this.valid) {
    //         this.body.y += 64;
    //         this.valid = false;
    //         this.maxStep--;
    //     } else if(cursors.left.isDown && this.valid && this.body.x>=192) {
    //         this.body.x -= 64;
    //         this.valid = false;
    //         this.maxStep--;
    //         //bun.anims.play('walk', true);
    //         //bun.body.velocity.x -= paddleVelocity;
    //     } else if(cursors.right.isDown && this.valid && this.body.x<=game.config.width-192) {
    //         this.body.x += 64;
    //         this.valid = false;
    //         this.maxStep--;
    //         //bun.anims.play('walk', true);
    //         //bun.body.velocity.x += paddleVelocity;
    //     } else if(cursors.up.isUp && cursors.down.isUp && cursors.left.isUp && cursors.right.isUp){
    //         this.valid = true;
    //         //bun.anims.play('idle');
    //         //bun.body.setDragX(1200);
    //         //bun.body.setDragY(1200);
    //     } else {
    //         this.setVelocityY(0);
    //     }
    //console.log(this.valid);
        // if(keys.Z.isDown && this.valid) {
        //     //this.body.velocity.y -= 20;
        //     this.anims.play('playerAttack', true);
        //     this.body.setSize(89, 79);
        //     this.scene.time.delayedCall(200, () => { this.body.setSize(32,64,true); });
        //     this.valid = false;
        //     //this.scene.physics.world.collide(this, this.scene.yokaiGroup, this.playerCollision, null, this.scene);
        //     // this.scene.time.events.add(500, function() {
        //     //     peachGirl.immune = false;
        //     //     //enemy.follow = true;
        //     // }, this.scene);
        //     //this.scene.time.delayedCall(500, () => { peachGirl.immune = false; });
        //     //this.moveBar.decrease(0.1);
        // }else if(keys.Z.isUp) {
        //     //this.body.velocity.y += 20;
        //     //this.anims.play('playerIdle', true);
            
        //     this.valid = true;
            
        //     //this.moveBar.decrease(0.2);
        // }

        if(keys.X.isDown && (keys.UP.isUp && keys.DOWN.isUp && keys.LEFT.isUp && keys.RIGHT.isUp)) {
            this.dodged = true;
            this.gametime2 = this.scene.time.now;
            this.dodge();
            this.immune = true;
            if(this.flipX) {
                this.body.setVelocityX(-this.speed*2.5);
            }else {
                this.body.setVelocityX(this.speed*2.5);
            }
            
            //this.shadowLock = true;
            // lock shadow bun spawning to a given time interval
            //this.time.delayedCall(15, () => { this.shadowLock = false; })
        }else if(this.scene.time.now - this.gametime2 > 300 && this.dodged) {
            this.dodged = false;
            this.immune = false;
        }

        if(keys.UP.isDown) {
            //this.body.velocity.y -= 20;
            this.anims.play('playerWalk', true);
            this.body.setVelocityY(-this.speed);
        } else if(keys.DOWN.isDown) {
            //this.body.velocity.y += 20;
            this.anims.play('playerWalk', true);
            this.body.setVelocityY(this.speed);
        }
        
        if(keys.LEFT.isDown) {
            //this.setVelocityX(-20);
            //debugger;
            this.anims.play('playerWalk', true);
            this.body.setVelocityX(-this.speed);
            this.setFlipX(true);
            this.setOrigin(0.5, 0.5);
        } else if(keys.RIGHT.isDown) {
            this.body.setVelocityX(this.speed);
            this.anims.play('playerWalk', true);
            this.setFlipX(false);
            
            //this.body.velocity.x += 20;
        } 
        // else {
        //     this.setVelocity(0, 0);
        //     //this.anims.play('playerIdle');
        //     //bun.body.setDragX(1200);
        //     //bun.body.setDragY(1200);
        // }Phaser.Input.Keyboard.JustDown(keys.Z)

        //console.log(this.gametime);
        if(!this.attacking && keys.Z.isDown && this.valid && (keys.UP.isUp && keys.DOWN.isUp && keys.LEFT.isUp && keys.RIGHT.isUp)) {
            this.gametime = this.scene.time.now;
            this.valid = false;
            if(this.flipX) {
                this.weapon = this.scene.add.sprite(peachGirl.x-20, peachGirl.y-10, 'attack').setOrigin(0.5, 0.5).setSize(30, 30, true).setScale(0.7);
            }else {
                
                this.weapon = this.scene.add.sprite(peachGirl.x+30, peachGirl.y-10, 'attack').setOrigin(0.5, 0.5).setSize(30, 30).setScale(0.7);
            }
            this.attacking = true;
            this.weapon.attack = this.attack;
            this.scene.physics.world.enable(this.weapon);
            this.scene.physics.add.overlap(this.weapon, this.scene.yokaiGroup, this.playerCollision, false, this.scene);
            this.scene.physics.add.overlap(this.weapon, this.scene.scaleGroup, this.playerCollision2, false, this.scene);
            //console.log(this.weapon.x+",  "+this.weapon.y);
            this.scene.time.delayedCall(100, () => { this.weapon.destroy(); });
            // this.weapon.destroy();
            //this.body.velocity.y -= 20;
            this.scene.sound.play('playerattack', { volume: 0.5});
            this.anims.play('playerAttack', true);
            //this.scene.time.delayedCall(1000, () => { this.anims.chain('playerIdle', true); });
            this.anims.chain('playerIdle', true);
            // this.on('animationcomplete', () => {  // callback after animation completes
            //     //this.anims.play('playerIdle');
            // }, this);

            //this.setSize(55, 50);
            //this.setOrigin(0.5, 0.5).setSize(25, 45, true);
            //this.scene.time.delayedCall(200, () => { this.setSize(18, 50); });
            
            
            //this.scene.physics.world.collide(this, this.scene.yokaiGroup, this.playerCollision, null, this.scene);
            // this.scene.time.events.add(500, function() {
            //     peachGirl.immune = false;
            //     //enemy.follow = true;
            // }, this.scene);
            //this.scene.time.delayedCall(500, () => { peachGirl.immune = false; });
            //this.moveBar.decrease(0.1);
        }else if(!this.attacking && keys.Z.isUp && (keys.UP.isUp && keys.DOWN.isUp && keys.LEFT.isUp && keys.RIGHT.isUp)){
            //this.body.velocity.y += 20;
            this.anims.play('playerIdle', true);
            // this.scene.time.delayedCall(1000, () => {  });
            
            this.valid = true;
            //this.moveBar.decrease(0.2);
        }else if(this.scene.time.now - this.gametime > 500) {
            //  this.scene.time.delayedCall(2000, () => { this.attacking = false; });
            this.attacking = false;
        }
        //if(keys.Z.isUp)
        // if(Phaser.Input.Keyboard.JustDown(keys.Z))
        //     console.log("mike");

        //this.body.velocity.normalize().scale(200);

        //this.scene.physics.world.collide(this, this.scene.yokaiGroup, this.playerCollision, null, this.scene);
        if (this.onEdges) {
            this.speed = 50;
            this.onEdges = false;
        } else {
            this.vel = 200;
        }

        this.getRoom();
        // check for collisions
        //this.physics.world.collide(bun, this.barrierGroup, this.barrierCollision, null, this);
    //     this.physics.world.collide(bun, this.suddenGroup, this.barrierCollision, null, this);

    //     this.physics.add.overlap(bun, powerups, this.powerupsCollision, null, this);
    }
    // if(this.maxStep>0) {
    //     // check for player input
    //     if(cursors.up.isDown && this.valid) {
    //         peachGirl.y -= 64;
    //         this.valid = false;
    //         this.steps--;
    //     } else if(cursors.up.isUp){
    //         this.valid = true;
    //         //bun.anims.play('idle');
    //         //bun.body.setDragX(1200);
    //         //bun.body.setDragY(1200);
    //     }else if(cursors.down.isDown && this.valid) {
    //         peachGirl.y += 64;
    //         this.valid = false;
    //         this.steps--;
    //     } else if(cursors.up.isUp && cursors.down.isUp){
    //         this.valid = true;
    //         //bun.anims.play('idle');
    //         //bun.body.setDragX(1200);
    //         //bun.body.setDragY(1200);
    //     }
        // check for collisions
        //this.physics.world.collide(peachGir, this.barrierGroup, this.barrierCollision, null, this);
    //     this.physics.world.collide(bun, this.suddenGroup, this.barrierCollision, null, this);

         
    //}

       
		// if(this.valid){
				
		// move
		// 	this.y -= this.speed;
		// }
       // add new barrier when existing barrier hits center X
    //    if(this.newBarrier && this.x < 0) {
    //    //if(this.newBarrier) {
    //        this.newBarrier = false;
    //        // call parent scene method from this context
    //        this.scene.addPeople(this.parent, this.velocity);
    //    }

    //    // destroy paddle if it reaches the left edge of the screen
    //    if(this.x < -this.width) {
    //        this.destroy();
    //    }
        // if(this.y <= 50){
        //     this.y = 530;
        // }
            
   }

    render() {
        game.debug.bodyInfo(peachGirl, 16, 24);
    }

    dodge() {
        // add a "shadow paddle" at main paddle position
        let shadow = this.scene.add.image(this.x, this.y, 'PeachGirl', 'PeachGirl').setOrigin(0.5);
        shadow.scaleX = this.scaleX;
        if(this.flipX == true) {
            shadow.setFlip(true,false);
        }else {
            shadow.setFlip(false,false);
        }
        shadow.scaleY = this.scaleY;            // scale to parent paddle
        //shadow.tint = Math.random() * 0xFFFFFF;   // tint w/ rainbow colors
        shadow.tint = 0xFACADE;
        shadow.alpha = 0.5;                       // make semi-transparent
        
            

        
        // tween alpha to 0
        this.scene.tweens.add({ 
            targets: shadow, 
            alpha: { from: 0.5, to: 0 }, 
            duration: 750,
            ease: 'Linear',
            repeat: 0 
        });
        // set a kill timer for trail effect
        this.scene.time.delayedCall(750, () => { shadow.destroy(); } );
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
                    let spawnChance = Math.random()*100;
      console.log("Chance: "+spawnChance);
      console.log(peachGirl.attack);
                    if(spawnChance <= peachGirl.attack) {
                        console.log("inside");
                        let critical;
                        let criticaltext;
                        // if(this.flipX) {
                        //     critical = yokai.scene.add.sprite(peachGirl.x-100, peachGirl.y, "critattack").setScale(0.8);
                        //     criticaltext = yokai.scene.add.sprite(peachGirl.x-100, peachGirl.y+20, "criticalHitText").setScale(0.8);
                        // }else {
                            
                        //     critical = yokai.scene.add.sprite(peachGirl.x-45, peachGirl.y, "critattack").setScale(0.8);
                        //     criticaltext = yokai.scene.add.sprite(peachGirl.x-45, peachGirl.y+30, "criticalHitText").setScale(0.8);
                        // }
                        critical = yokai.scene.add.sprite(peachGirl.x, peachGirl.y, "critattack").setScale(0.8);
                            criticaltext = yokai.scene.add.sprite(peachGirl.x, peachGirl.y, "criticalHitText").setScale(0.8);
                        // this.scene.time.addEvent({ 
                        //     delay: 300, 
                        //     callback: ()=>{
                        //         lvup.y -= 5;
                        //     }, 
                        //     callbackScope: this.scene, 
                        //     repeat: 3
                        // });
                        //   yokai.scene.tweens.add({
                        //     targets: critical,
                        //     alpha: 0,
                        //     ease: 'Elastic.easeOut',  
                        //     duration: 500,
                        //     repeat: 0,
                        //     yoyo: true
                        //   })
                        critical.anims.play('critical', true);
                        yokai.scene.time.delayedCall(1100, () => { 
                            critical.destroy();
                            criticaltext.destroy();

                        });
                        yokai.health -= 2;
                    }else {
                        yokai.health--;
                    }
                    
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
                // yokai.yokaiCD.remove();
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
            //console.log("Player:"+peachGirl.life+" immune:"+peachGirl.immune+"\nyokai:"+yokai.health+" immune:"+yokai.immune);
            
        }

    playerCollision2(peachGirl, yokai) {
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
            
            yokai.scaleCD = 1;
        
            
        
                if(yokai.immune == false) {
                    let spawnChance = Math.random()*100;
        console.log("Chance: "+spawnChance);
        console.log(peachGirl.attack);
                    if(spawnChance <= peachGirl.attack) {
                        console.log("inside");
                        let critical;
                        let criticaltext;
                        // if(this.flipX) {
                        //     critical = yokai.scene.add.sprite(peachGirl.x-100, peachGirl.y, "critattack").setScale(0.8);
                        //     criticaltext = yokai.scene.add.sprite(peachGirl.x-100, peachGirl.y+20, "criticalHitText").setScale(0.8);
                        // }else {
                            
                        //     critical = yokai.scene.add.sprite(peachGirl.x-45, peachGirl.y, "critattack").setScale(0.8);
                        //     criticaltext = yokai.scene.add.sprite(peachGirl.x-45, peachGirl.y+30, "criticalHitText").setScale(0.8);
                        // }
                        critical = yokai.scene.add.sprite(peachGirl.x, peachGirl.y, "critattack").setScale(0.8);
                            criticaltext = yokai.scene.add.sprite(peachGirl.x, peachGirl.y, "criticalHitText").setScale(0.8);
                        // this.scene.time.addEvent({ 
                        //     delay: 300, 
                        //     callback: ()=>{
                        //         lvup.y -= 5;
                        //     }, 
                        //     callbackScope: this.scene, 
                        //     repeat: 3
                        // });
                        //   yokai.scene.tweens.add({
                        //     targets: critical,
                        //     alpha: 0,
                        //     ease: 'Elastic.easeOut',  
                        //     duration: 500,
                        //     repeat: 0,
                        //     yoyo: true
                        //   })
                        critical.anims.play('critical', true);
                        yokai.scene.time.delayedCall(1100, () => { 
                            critical.destroy();
                            criticaltext.destroy();

                        });
                        yokai.health -= 2;
                    }else {
                        yokai.health--;
                    }
                    
                    
                }

            yokai.immune = true;
            // yokai.yokaiCD.remove();
            yokai.yokaiCD = yokai.scene.time.addEvent({
                delay: 500,
                callback: ()=>{
                    yokai.immune = false;
                    yokai.scaleCD = null;
                },
                callbackScope: this
                //loop: true,
                //timeScale: 0.1
            });
            
        }

    /** Returns player's current and previous room, flags rooms player has entered. */
    getRoom() {

        // place holder for current room.
        let roomNumber;

        // loop through rooms in this level.
        for (let room in this.scene.rooms) {
            let roomLeft   = this.scene.rooms[room].x;
            let roomRight  = this.scene.rooms[room].x + this.scene.rooms[room].width;
            let roomTop    = this.scene.rooms[room].y;
            let roomBottom = this.scene.rooms[room].y + this.scene.rooms[room].height;

            // Player is within the boundaries of this room.
            if (this.x > roomLeft && this.x < roomRight &&
                this.y > roomTop  && this.y < roomBottom) {

                roomNumber = room;

                // Set this room as visited by player.
                // let visited = this.scene.rooms[room].properties.find(function(property) {
                //     return property.name === 'visited';
                // } );

                // visited.value = true
            }
        }

        // Update player room variables.
        if (roomNumber != this.currentRoom) {
            this.previousRoom = this.currentRoom;
            this.currentRoom = roomNumber;
            this.roomChange = true;
        } else {
            this.roomChange = false;
        }
    }

    addExp(num){
		
		
		this.exp += num;
		//textExp.text = "EXP" + this.exp;
		
		
		while(this.exp >= nextLevelList[this.lv] && this.lv < nextLevelList.length){
            this.scene.sound.play('level_up', { volume: 0.5});
            this.lv ++;
            ischoice = true;
            game.scene.pause('playScene');
            let lvup = this.scene.add.sprite(peachGirl.x, peachGirl.y-50, "lvup").setScale(2);
            this.scene.time.addEvent({ 
                delay: 300, 
                callback: ()=>{
                    lvup.y -= 5;
                }, 
                callbackScope: this.scene, 
                repeat: 3
            });
            this.scene.time.delayedCall(2000, () => { lvup.destroy(); });
            
		}
	}
}