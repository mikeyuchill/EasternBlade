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
        this.tongue = null;
        this.tornado = null;										
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
        // if(this.name == 'monkkid') {
        //     this.tongue = this.scene.add.sprite(this.x-20, this.y-10, 'tongue').setOrigin(0.5, 0.5).setSize(60, 30, true).setScale(0.2);
        //     this.scene.physics.world.enable(this.tongue);
        // }
            
        // this.playerCD = this.scene.time.addEvent();
        this.yokaiattack;
        this.tongueGroup = this.scene.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        this.tornadoGroup = this.scene.add.group({
            runChildUpdate: true,    // make sure update runs on group children
            immovable: true
        });
        this.tornadotime = null;
        this.playerCD = null;
        this.yokaiCD = null;
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

        this.yokaiattack = this.scene.time.addEvent({
            delay: this.interval,
            callback: ()=>{
                
                console.log(this.tongue);
                this.anims.play(this.name+"_attack", true);
                if(this.name == 'monkkid') {
                    this.on('animationstart-monkkid_attack', () => {  // callback after animation completes
                        if(this.flipX) {
                            this.tongue = this.scene.add.sprite(this.x+20, this.y-10, 'tongue').setOrigin(0.5, 0.5).setSize(60, 30, true).setScale(0.2);
                        }else {
                            
                            this.tongue = this.scene.add.sprite(this.x-30, this.y-10, 'tongue').setOrigin(0.5, 0.5).setSize(60, 30).setScale(0.2);
                        }
                        this.scene.physics.world.enable(this.tongue);
                        this.tongueGroup.add(this.tongue);
                        // this.scene.time.delayedCall(10, () => { 
                        //     this.tongue.destroy(); 
                        //     console.log("shoule be destroy");
                        // });
                    }, this);

                    // this.scene.time.delayedCall(100, () => { 
                    //     this.tongue.destroy(); 
                    //     console.log("shoule be destroy");
                    // });

                    this.on('animationrestart-monkkid_attack', () => {  // callback after animation completes
                        if(this.tongue != null)
                            this.tongue.destroy(); 
                    }, this);

                    this.on('animationcomplete-monkkid_attack', () => {  // callback after animation completes
                        if(this.tongue != null)
                            this.tongue.destroy(); 
                    }, this);

                    this.on('animationrepeat-monkkid_attack', () => {  // callback after animation completes
                        if(this.tongue != null)
                            this.tongue.destroy(); 
                    }, this);

                    for(var i = this.tongueGroup.getChildren().length - 1; i >= 0; --i) { 
                        //console.log(i);
                        //console.log("number of new tongues:"+this.tongueGroup.getChildren().length);
                        this.tongueGroup.remove(this.tongueGroup.getChildren()[i], true, true);
                    }
                    // if(this.tongue != null) {
                    //     this.scene.time.delayedCall(100, () => { 
                    //         this.tongue.destroy(); 
                    //         console.log("shoule be destroy");
                    //     });
                    // }

                }
                
            },
            callbackScope: this,
            loop: true,
            //timeScale: 0.1
        });

        this.yokaiattack.paused = true;
        
        this.summon = this.scene.time.addEvent({
            delay: 8000,
            callback: ()=>{
                
                //console.log(this.tornado);
                
                if(this.name == 'heavenlydog') {
                    this.anims.play(this.name+"_summon", true);
                    // this.on('animationstart-heavenlydog_summon', (anim, frame, gameobj) => {  // callback after animation completes
                        
                    //     // this.tongueGroup.add(this.tongue);
                    //     // this.scene.time.delayedCall(10, () => { 
                    //     //     this.tongue.destroy(); 
                    //     //     console.log("shoule be destroy");
                    //     // });
                    // }, this);

                    for(var i=0; i<4; i++){
                        this.tornado = this.scene.physics.add.sprite(this.x, this.y, 'heavenlydog_tornado');
                        
                        this.tornado.index = i;
                        // console.log(this.tornado.index);

                        // thunder.x = this.x - Math.round(thunder.width/2) + Math.round(this.width/2);
                        // thunder.y = this.y - Math.round(thunder.height/2) + Math.round(this.height/2);
                        this.tornado.anims.play('heavenlydog_tornado', true);
                        this.tornadoGroup.add(this.tornado);
                        console.log("once");
                        this.tornadotime = this.scene.time.now;
                        // console.log(this.tornadoGroup.getChildren().length);
                        
                        // this.scene.time.delayedCall(2000, () => { 
                        //     switch(this.tornado.index){
                        //         case 0:
                        //             this.tornado.destroy();
                        //             break;
                        //         case 1:
                        //             this.tornado.destroy();
                        //             break;
                        //         case 2:
                        //             this.tornado.destroy();
                        //             break;
                        //         case 3:
                        //             this.tornado.destroy();
                        //             break;
                        //     }
                             
                        // });
                        
                    }
                    // this.scene.time.delayedCall(100, () => { 
                    //     this.tongue.destroy(); 
                    //     console.log("shoule be destroy");
                    // });

                    // this.on('animationrestart-monkkid_attack', () => {  // callback after animation completes
                    //     if(this.tornado != null)
                    //         this.tornado.destroy(); 
                    // }, this);

                    // this.on('animationcomplete-monkkid_attack', () => {  // callback after animation completes
                    //     if(this.tornado != null)
                    //         this.tornado.destroy(); 
                    // }, this);

                    // this.on('animationrepeat-monkkid_attack', () => {  // callback after animation completes
                    //     if(this.tornado != null)
                    //         this.tornado.destroy(); 
                    // }, this);

                    // for(var i = this.tornadoGroup.getChildren().length - 1; i >= 0; --i) { 
                    //     //console.log(i);
                    //     //console.log("number of new tornados:"+this.tornadoGroup.getChildren().length);
                    //     //this.tornadoGroup.remove(this.tornadoGroup.getChildren()[i], true);
                    //     this.scene.time.addEvent({ 
                    //         delay: 300,
                    //         callback: ()=>{
                                
                    //             switch(i){
                    //                 case 0:
                    //                     this.tornadoGroup.getChildren()[i].x += -1;
                    //                     this.tornadoGroup.getChildren()[i].y += -1;
                    //                     break;
                    //                 case 1:
                    //                     this.tornadoGroup.getChildren()[i].x += 1;
                    //                     this.tornadoGroup.getChildren()[i].y += -1;
                    //                     break;
                    //                 case 2:
                    //                     this.tornadoGroup.getChildren()[i].x += 1;
                    //                     this.tornadoGroup.getChildren()[i].y += 1;
                    //                     break;
                    //                 case 3:
                    //                     this.tornadoGroup.getChildren()[i].x += -2;
                    //                     this.tornadoGroup.getChildren()[i].y += 2;
                    //                     break;
                    //             }
                    //         }, 
                    //         callbackScope: this.scene, 
                    //         loop: true
                    //     });
                    // }
                    // if(this.tongue != null) {
                    //     this.scene.time.delayedCall(100, () => { 
                    //         this.tongue.destroy(); 
                    //         console.log("shoule be destroy");
                    //     });
                    // }

                }
                
            },
            callbackScope: this,
            loop: true,
            //timeScale: 0.1
        });
        this.summon.paused = true;

        this.setImmovable();
        //console.log(this.body);
    //}
    
    }

    update() {
        // override physics sprite update()
        super.update();
        // if(this.tornado != null) {
        //     switch(this.tornado.index){
        //         case 0:
        //             this.tornado.x += -1;
        //             this.tornado.y += -1;
        //             break;
        //         case 1:
        //             this.tornado.x += 1;
        //             this.tornado.y += -1;
        //             break;
        //         case 2:
        //             this.tornado.x += 1;
        //             this.tornado.y += 1;
        //             break;
        //         case 3:
        //             this.tornado.x += -1;
        //             this.tornado.y += 1;
        //             break;
        //     }
        // }
        
        
        for(var i = this.tornadoGroup.getChildren().length - 1; i >= 0; --i) { 
            //console.log(i);
            //console.log("number of new tornados:"+this.tornadoGroup.getChildren().length);
            let index = i%4;
            // console.log(index);
                    switch(index){
                        case 0:
                            // this.tornadoGroup.getChildren()[i].x += -1;
                            // this.tornadoGroup.getChildren()[i].y += -1;
                            this.tornadoGroup.getChildren()[i].setVelocity(-100, -100);
                            break;
                        case 1:
                            // this.tornadoGroup.getChildren()[i].x += 1;
                            // this.tornadoGroup.getChildren()[i].y += -1;
                            this.tornadoGroup.getChildren()[i].setVelocity(100, -100);
                            break;
                        case 2:
                            // this.tornadoGroup.getChildren()[i].x += 1;
                            // this.tornadoGroup.getChildren()[i].y += 1;
                            this.tornadoGroup.getChildren()[i].setVelocity(100, 100);
                            break;
                        case 3:
                            // this.tornadoGroup.getChildren()[i].x += -1;
                            // this.tornadoGroup.getChildren()[i].y += 1;
                            this.tornadoGroup.getChildren()[i].setVelocity(-100, 100);
                            break;
                    }
            // this.scene.time.delayedCall(1000, () => { 
            //     this.tornadoGroup.remove(this.tornadoGroup.getChildren()[i], true);
            // });
            // this.tornadoGroup.clear();
            if(this.scene.time.now - this.tornadotime > 5000)
                this.tornadoGroup.remove(this.tornadoGroup.getChildren()[i], true, true);
        }
        // if(this.tongue != null)
        //     this.tongue.destroy(); 
        // if(Phaser.Math.Distance.BetweenPoints(peachGirl, this)<this.range){
        //     this.attacking = true;
        // }
        
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
        if(this.name == 'oxheaded' || this.name == 'horsefaced' || this.name == 'monkkid' || this.name == 'heavenlydog'){
            //console.log(Phaser.Math.Distance.BetweenPoints(peachGirl, this));
            if(Phaser.Math.Distance.BetweenPoints(peachGirl, this)<200){
                if(this.name == 'heavenlydog') {
                    this.summon.paused = true;
                }
                
                
                this.follow = true;
                if(this.follow){
                    this.scene.physics.moveToObject(this, peachGirl, 20);
                }
                
                //console.log("velX:"+this.x+", flip:"+peachGirl.x);
                if(this.x < peachGirl.x)
                    this.setFlip(true,false);
                else
                    this.setFlip(false,false);
                if(Phaser.Math.Distance.BetweenPoints(peachGirl, this)<=this.range) {
                    this.yokaiattack.paused = false;
                    
                    this.attacking = true;
                    //this.anims.play(this.name+"_attack", true);
                }else {
                    this.attacking = false;
                    //this.anims.chain(this.name+"_walk");
                    this.yokaiattack.paused = true;
                    this.anims.play(this.name+"_walk", true);

                }
                    
                    //this.anims.play(this.name+"_walk");
                    //this.yokaiattack.remove();
                                  
                // else
                //     this.anims.stop(this.name+"_attack");

            }else {
                //this.anims.stop();
                this.follow = false;
                if(this.name == 'heavenlydog') {
                    this.summon.paused = false;
                }
            //this.anims.play(this.name+"_walk");
            }
            if(!this.follow) {
                this.gameTimer.paused = false;
            }else {
                this.gameTimer.paused = true;
            }
        }
        //console.log(peachGirl.valid);
        // yokai collision detection
        if(keys.Z.isDown && this.valid) {
            //console.log("should be here");
            
            
            //this.scene.time.delayedCall(1000, () => { this.immune = false; });
            this.valid = false;
            
            
        }else if(keys.Z.isUp) {
            //console.log("here");
            if(this.tongue == null)
                this.scene.physics.world.collide(this, peachGirl, this.yokaiCollision, null, this.scene);
            else if(this.tongue != null)
                this.scene.physics.add.overlap(this.tongue, peachGirl, this.yokaiCollision, false, this.scene);
            
            this.scene.physics.world.collide(this.tornadoGroup, peachGirl, this.yokaiCollision, null, this.scene);
            // this.scene.physics.add.overlap(this.tornadoGroup, peachGirl, this.yokaiCollision, false, this.scene);
            //this.scene.time.delayedCall(1000, () => { peachGirl.immune = false; });
            this.valid = true;
        }

        // if(this.name == 'monkkid' && this.attacking ) {
        //     if(this.flipX) {
        //         this.tongue = this.scene.add.sprite(this.x-20, this.y-10, 'tongue').setOrigin(0.5, 0.5).setSize(60, 30, true).setScale(0.2);
        //     }else {
                
        //         this.tongue = this.scene.add.sprite(this.x+30, this.y-10, 'tongue').setOrigin(0.5, 0.5).setSize(60, 30).setScale(0.2);
        //     }
        //     //console.log(this.attacking);
        //     this.scene.physics.world.enable(this.tongue);
        //     // this.tongue.x = this.x;
        //     // this.tongue.y = this.y;
        //     //this.tongue.setVisible(false);
        //     if(this.attacking) {
        //         this.tongue.setVisible(true);
                
                
        //     }else {
        //         //this.tongue.setVisible(false);
        //         //this.scene.physics.world.disable(this.tongue);
        //         this.tongue.active = false;
                
        //     }
            
        //     //this.scene.physics.add.overlap(this.tongue, this.scene.yokaiGroup, this.playerCollision, false, this.scene);
        //     //console.log(this.tongue.x+",  "+this.tongue.y);
        //     this.scene.time.delayedCall(100, () => { this.tongue.destroy(); });
        // }
        
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

    

    yokaiCollision(yokai, peachGirl) {
        // if(yokai==yokai.tornado) {
        //     console.log("hit");
        //     yokai.destroy();
        // }
        if(peachGirl.immune == false) {
            let spawnChance = Math.random()*100;
      console.log("Chance: "+spawnChance);
      console.log(peachGirl.attack);
            if(spawnChance <= peachGirl.defense) {
                console.log("inside");
                let flawless;
                let flawlesstext;
                // if(this.flipX) {
                //     critical = yokai.scene.add.sprite(peachGirl.x-100, peachGirl.y, "critattack").setScale(0.8);
                //     criticaltext = yokai.scene.add.sprite(peachGirl.x-100, peachGirl.y+20, "criticalHitText").setScale(0.8);
                // }else {
                    
                //     critical = yokai.scene.add.sprite(peachGirl.x-45, peachGirl.y, "critattack").setScale(0.8);
                //     criticaltext = yokai.scene.add.sprite(peachGirl.x-45, peachGirl.y+30, "criticalHitText").setScale(0.8);
                // }
                flawless = yokai.scene.add.sprite(peachGirl.x, peachGirl.y, "flawlessdefense").setScale(0.8);
                    flawlesstext = yokai.scene.add.sprite(peachGirl.x, peachGirl.y, "flawlessDefenseText").setScale(0.8);
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
                flawless.anims.play('flawless', true);
                yokai.scene.time.delayedCall(1100, () => { 
                    flawless.destroy();
                    flawlesstext.destroy();

                });
                
            }else {
                peachGirl.life--;
                peachGirl.tint = 0xFF0000;
                //console.log(peachGirl);
                //yokai.playerCD.remove();
                yokai.scene.cameras.main.shake(500, 0.001, true);
                yokai.scene.time.delayedCall(500, () => { peachGirl.tint = 0xFFFFFF; });

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
                    //peachGirl.body.velocity.x = 
                            //console.log(peachGirl.body.velocity.x);
                            //peachGirl.body.velocity.y = Phaser.Math.Between(-200, 200);
                    peachGirl.body.setVelocityX(Phaser.Math.Between(-1000, -928));
                    peachGirl.body.setVelocityY(Phaser.Math.Between(-200, 200));
                        
                } else if (peachGirl.body.touching.left) {
                    peachGirl.body.velocity.x = Phaser.Math.Between(228, 350);
                    peachGirl.body.velocity.y = Phaser.Math.Between(-200, 200);
                }
            }
            
            
            // let frame = yokai.scene.textures.getFrame('PeachGirl', 'PeachGirl');
            // //console.log(frame);
            // let graphics = this.add.graphics({
            //     x: peachGirl.x - peachGirl.width / 2,
            //     y: peachGirl.y - peachGirl.height / 2
            //   })
            //   .fillStyle(0xff0000, 0.75)
            //   .setTexture('PeachGirl', 'PeachGirl', 1)
            //   .fillRect(frame.x, frame.y, frame.cutWidth, frame.cutHeight);

            //   yokai.scene.tweens.add({
            //     targets: graphics,
            //     alpha: 0,
            //     ease: 'Cubic.easeOut',  
            //     duration: 500,
            //     repeat: 0,
            //     yoyo: true
            //   })
              
            
        }
                
        peachGirl.immune = true;
        //console.log(yokai.timer);

        // console.log("peachGirl.immune:"+peachGirl.immune);
        // console.log("yokai.immune:"+yokai.immune);
        //console.log(game.time.events);
        //yokai.playerCD.remove();
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