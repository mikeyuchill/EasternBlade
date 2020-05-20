class Player extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, xposition, ypostion) {
       //this.type = Phaser.Math.RND.pick(['normal', 'gooey', 'runny'])
       // call Phaser Physics Sprite constructor
       super(scene, xposition, ypostion, 'peachGirl'); 

       
      //console.log('object is:'+type);
        this.scene = scene;
        //console.log('object is:'+Phaser.Physics.Arcade.Sprite.texture);
        // set up physics sprite
        this.currentRoom = 0;       // Set start room so room change flag doens't fire.
        this.previousRoom = null;
        this.roomChange = false;
        this.canMove = true;
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true);
        //this.setVelocityX(velocity);            // make it go!
        keys = scene.input.keyboard.addKeys('Z,X,A,D,UP,LEFT,RIGHT,DOWN,SPACE');
       //this.setImmovable();                    
       //this.tint = Math.random() * 0xFFFFFF;   // randomize tint
       //this.speed = playerSpeed;
       this.onEdges = false;
		
		this.lv			= 1;
        this.exp		= 0;
        this.attack     = 25;
        this.defense    = 25;
        
        
        this.valid = true;
        this.speed = 200;
        this.maxStep = 100;
        this.maxLife = 5;
        this.life = this.maxLife;
        this.ATK = scene.add.text(150, 85-textSpacer, `ATK: ${this.attack}`, { fontFamily: 'Freckle Face', fontSize: '36px', color: '#F00' });
        this.DFS = scene.add.text(180+2*textSpacer, 85-textSpacer, `DFS: ${this.defense}`, { fontFamily: 'Freckle Face', fontSize: '36px', color: '#00F' });
        this.steps = scene.add.text(160, 85, `${this.maxStep}  Steps`, { fontFamily: 'Freckle Face', fontSize: '36px', color: '#000' });
        this.moveBar = new Movebar(this.scene, 70, 40);

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
       this.body.setVelocity(0);
       //console.log(this.moveBar.value);
       this.ATK.text = `ATK: ${this.attack}`;
       this.DFS.text = `DFS: ${this.defense}`
       //cursors = this.scene.input.keyboard.createCursorKeys();
       if(this.life <= 0 || this.moveBar.value==0){
           //create tween to fade out audio
           this.scene.tweens.add({
            targets: bgm,
            volume: 0,
            ease: 'Linear',
            duration: 2000,
            });
            this.scene.scene.start('gameOverScene');
       }
            
        if(this.maxStep>0 && this.life>0) {
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
        if(keys.Z.isDown) {
            //this.body.velocity.y -= 20;
            this.body.setVelocityY(-this.speed);
            //this.moveBar.decrease(0.1);
        } 
        // else if(keys.Z.isU) {
        //     //this.body.velocity.y += 20;
        //     this.body.setVelocityY(this.speed);
        //     //this.moveBar.decrease(0.2);
        // }

        if(keys.UP.isDown) {
            //this.body.velocity.y -= 20;
            this.body.setVelocityY(-this.speed);
            //this.moveBar.decrease(0.1);
        } else if(keys.DOWN.isDown) {
            //this.body.velocity.y += 20;
            this.body.setVelocityY(this.speed);
            //this.moveBar.decrease(0.2);
        }
        
        if(keys.LEFT.isDown) {
            //this.setVelocityX(-20);
            //bun.anims.play('walk', true);
            this.body.setVelocityX(-this.speed);
            //this.moveBar.decrease(0.2);
            this.setFlipX(true);
        } else if(keys.RIGHT.isDown) {
            this.body.setVelocityX(this.speed);
            //this.moveBar.decrease(0.2);
            this.setFlipX(false);
            //bun.anims.play('walk', true);
            //this.body.velocity.x += 20;
        } 
        // else {
        //     this.setVelocity(0, 0);
        //     //bun.body.setDragX(1200);
        //     //bun.body.setDragY(1200);
        // }
        this.body.velocity.normalize().scale(200);

        this.scene.physics.world.collide(this, this.scene.yokaiGroup, this.playerCollision, null, this.scene);
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
        //console.log(yokai.health);
        if(keys.UP.isDown || keys.DOWN.isDown || keys.LEFT.isDown || keys.RIGHT.isDown){
            if(yokai.body.y < peachGirl.body.y) {
            
            yokai.body.velocity.y = Phaser.Math.Between(-300, -200);
            yokai.body.velocity.x = Phaser.Math.Between(-128, 128);
            
            // yokai.body.velocity.y = -200;
            // yokai.body.velocity.x = -200;
	        } else if (yokai.body.y > peachGirl.body.y) {
                yokai.body.velocity.y = Phaser.Math.Between(200, 300);
                yokai.body.velocity.x = Phaser.Math.Between(-128, 128);
	        } else if (yokai.body.x < peachGirl.body.x) {
                yokai.body.velocity.x = Phaser.Math.Between(-300, -228);
                console.log(yokai.body.velocity.x);
                //yokai.body.velocity.y = Phaser.Math.Between(-200, 200);
            	
	        } else if (yokai.body.x > peachGirl.body.x) {
                yokai.body.velocity.x = Phaser.Math.Between(228, 350);
                yokai.body.velocity.y = Phaser.Math.Between(-200, 200);
	        }
        }else {
            if(yokai.body.y < peachGirl.body.y) {
            
                peachGirl.body.y += 64;
                
                // yokai.body.velocity.y = -200;
                // yokai.body.velocity.x = -200;
            } else if (yokai.body.y > peachGirl.body.y) {
                peachGirl.body.y -= 64;
            } else if (yokai.body.x < peachGirl.body.x) {
                peachGirl.body.x += 64;
                    
            } else if (yokai.body.x > peachGirl.body.x) {
                peachGirl.body.x -= 64;
            }
        }
    
        
        
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
}