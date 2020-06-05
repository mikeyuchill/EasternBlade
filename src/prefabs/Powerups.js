class Powerups extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, type, xposition, ypostion) {
       // call Phaser Physics Sprite constructor
       super(scene, xposition, ypostion, type);
       
       // set up physics sprite

       scene.add.existing(this);               // add to existing scene, displayList, updateList
       scene.physics.add.existing(this);       // add physics body
    //    if(functionality == 'runny') {
    //     //this.setBounceY(1);
    //        this.setVelocity(-300, Phaser.Math.RND.pick([300, -300]));  // make it go!
    //        this.setCollideWorldBounds(true, true, true);
    //     // scene.time.delayedCall(3000, () => {
    //     //     this.destroy();
    //     //     scene.addPowerups(this.parent, this.velocity);
    //     // }, null, this); 
    //   }else if(functionality == 'chili') {
    //        this.setVelocityX(-700);
    //   }else {
    //        this.setVelocityX(velocity);
    //   }          
       this.setImmovable();                    
       //this.tint = Math.random() * 0xFFFFFF;   // randomize tint
       //this.newNormal = true;                 // custom property to control barrier spawning
console.log("inside");
       this.type = type;
       this.scene = scene;
       //this.velocity = velocity;
       //this.sfxpower = scene.sound.add('Effect').setVolume(0.1); // add powerup sfx
       
   }

   update() {
       // override physics sprite update()
       
       this.scene.physics.world.overlap(this, peachGirl, this.powerupsCollision, null, this.scene);
       //console.log(this.eat);
       // add new barrier when existing barrier hits center X
    //    if((this.newNormal && this.x < 0)) {
    //        this.newNormal = false;
    //        // call parent scene method from this context
    //        this.scene.addPowerups(this.parent, this.velocity);
    //    }

       // destroy paddle if it reaches the left edge of the screen
    //    if(this.x < -this.width) {
    //        this.destroy();
    //    }
   }

   powerupsCollision(powerups, peachGirl){
    
        //powerups.sfxpower.play();
        powerups.disableBody(true, true);
        // this.time.delayedCall(3000, () => {
        //     this.addPowerups();
        // }, null, this);

        //this.powerupsGroup.remove(powerups, true);

        //console.log(powerups.eat);
        //console.log('type:'+powerups.functionality);
        if(powerups.functionality==='normal') {
            //console.log("things:"+this.add.displayList);
            //this.add.displayList.removeAll();
            //if(this.barrierGroup.children.isOnScreen())
            //console.log("powerups.eat:"+powerups.eat);
            //this.barrierGroup.killAndHide(this.barrierGroup.getChildren()[0]);
            //this.barrierGroup.remove(this.barrierGroup.getChildren()[1], true);
            
                //this.barrierGroup.clear(true);
            this.yolkBar.alpha = 0.8;
            this.gameTimer.paused = true;
            this.time.delayedCall(3000, () => {
                this.yolkBar.alpha = 1;
                this.gameTimer.paused = false;
            }, null, this);
        }else if(powerups.functionality==='gooey') {
            //console.log("gooey");
            this.randomTime += 5;
            this.suddenTimer.text = this.randomTime+" S";
            this.countdownE.remove();
        this.countdownE = this.time.addEvent({
            delay: 1000, 
            callback: this.timerE, 
            callbackScope: this, 
            repeat: this.randomTime-1
        })
        this.suddenEvent.remove();
        this.suddenEvent = this.time.addEvent({ 
            delay: this.randomTime * 1000,
            callback: this.addSudden, 
            callbackScope: this
        });
            this.gooeyAnim.alpha = 1;
            this.time.delayedCall(3000, () => {
                this.gooeyAnim.alpha = 0;
            }, null, this);

        }else if(powerups.functionality==='runny') {
            //console.log("runny");
            //this.background.tilePositionX += 10;
            //this.addPowerups();
            this.runnyAnim.alpha = 1;
            this.time.delayedCall(3000, () => {
                this.runnyAnim.alpha = 0;
            }, null, this);
            if(this.timeLeft + 5 > 60)
                this.timeLeft = 60;
            else
                this.timeLeft += 5;
        //console.log("time after:"+this.timeLeft);
            if((this.yolkMask.x + 5 * this.yolkMask.displayWidth / (60)) > 210)
                this.yolkMask.x = 210;
            else
                this.yolkMask.x += 5 * this.yolkMask.displayWidth / (60);
            //bun.setVelocityX(paddleVelocity * 8);
        }else { // chili
            for(var i = this.barrierGroup.getChildren().length - 1; i >= 0; --i) { 
                //console.log(i);
                //console.log("number of new barriers:"+this.barrierGroup.getChildren().length);
                this.barrierGroup.remove(this.barrierGroup.getChildren()[i], true);
            }
            //console.log("#ofsudden: "+this.suddenGroup.getChildren().length);
            for(var j = this.suddenGroup.getChildren().length - 1; j >= 0; --j) { 
                //console.log(i);
                this.suddenGroup.remove(this.suddenGroup.getChildren()[j], true);
            }

            this.time.delayedCall(4000, () => {
                this.addBarrier();
            }, null, this);

            if(this.hardMODE) {
                this.randomTime = Phaser.Math.Between(4,8);
            }else if(this.extremeMODE) {
                this.randomTime = Phaser.Math.Between(1,3);
            }else{
                this.randomTime = Phaser.Math.Between(9,12);
            }
            //console.log("new random:"+this.randomTime);
            this.randomTime = this.oldtime;
            this.suddenTimer.text = this.randomTime+" S";
            this.countdownE.remove();
        this.countdownE = this.time.addEvent({
            delay: 1000, 
            callback: this.timerE, 
            callbackScope: this, 
            repeat: this.randomTime-1
        })
        this.suddenEvent.remove();
        this.suddenEvent = this.time.addEvent({ 
            delay: this.randomTime * 1000,
            callback: this.addSudden, 
            callbackScope: this
        });
            
        }
        // if(this.physics.add.overlap(paddle, this.powerupsGroup)){
        //     
        // }

    }
}