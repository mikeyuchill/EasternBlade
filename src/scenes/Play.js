class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        var playerSpeed = 1;	// player speed
        var nextLevelList = [	// next level EXP
	        0,
	        2,
	        4,
	        7,
	        10,
	        14,
	        20,
	        26,
	        32,
	        38,
	        46,
	        52,
	        58,
	        66,
	        72,
	        80,
	        90,
	        100,
	        110,
	        120,
	        130,
	        140,
	        150,
	        999
        ];
        // reset parameters
        this.barrierSpeed = -150;
        this.barrierSpeedMax = -1000;
        level = 0;
        this.hardMODE = false;
        this.extremeMODE = false;
        this.shadowLock = false;

        // set up audio, play bgm
        bgm = this.sound.add('bgm', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        });
        bgm.play();

        // set up cursor keys
        //cursors = this.input.keyboard.createCursorKeys();

        WebFont.load({
            google: {
                families: [ 'Freckle Face', 'Finger Paint', 'Nosifer' ]
            }
        });
        // Make map of level 1.
        this.map = this.make.tilemap({key: "level-1"});

        // Define tiles used in map.
        const tileset = this.map.addTilesetImage("dragonTiles",  "tiles", 64, 64, 0, 0);

        // The map layers.
        floorLayer = this.map.createStaticLayer("Ground",    tileset, 0, 0);
        floorLayer.debug = true;
        scaleLayer = this.map.createStaticLayer("Collisions",        tileset, 0, 0);
        aboveLayer = this.map.createStaticLayer("Above Player", tileset, 0, 0);

        console.log(this.map.widthInPixels+", "+this.map.heightInPixels);
        // Set physics boundaries from map width and height.
        this.physics.world.setBounds(64, 0, this.map.widthInPixels-128, this.map.heightInPixels);

        
        // Collisions based on layer.
        scaleLayer.setCollisionByProperty({collides: true});
        //this.floorLayer.setCollisionBetween(7,7);
        // Set the above player layer higher than everything else.
        //this.aboveLayer.setDepth(10);

        this.rooms = [];
        this.edges = this.physics.add.group();

        const debugGraphics = this.add.graphics().setAlpha(0.75);
        scaleLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        }); 

        
        this.map.findObject('Objects', function(object) {

            // rooms
            if (object.type === 'Room') {
                this.rooms.push(object);
            }

            // stairs
            if (object.name === 'Edges') {
                this.edges.add(new Phaser.GameObjects.Sprite(this, object.x, object.y));
            }

            // spawn points
            //if (object.type === 'Spawn') {
                if (object.name === 'P1Spawn') {
                    console.log(object.y);
                    peachGirl = new Player(this, object.x, object.y).setOrigin(0.5,0.5).setSize(32,64,true).setScale(1.2);    // create new barrier
                }
            //}

        }, this);

        console.log(peachGirl.y);
        console.log(this.rooms);
        var oni = new Enemy(this, 'oni', Phaser.Math.Between(128, game.config.width-128), Phaser.Math.Between(128, game.config.height)).setSize(40,50,true);    // create new barrier
        this.boss = new Enemy(this, 'boss', Phaser.Math.Between(200, game.config.width-200), Phaser.Math.Between(128, game.config.height)).setSize(25,25,true).setScale(3).setOrigin(0.5,0.5);    // create new barrier
        //peachGirl.body.setBoundsRectangle(customBounds);
        //oni.body.setBoundsRectangle(customBounds);
        //this.boss.body.setBoundsRectangle(customBounds);
        oni.setCollideWorldBounds(true);
        this.boss.setCollideWorldBounds(true);
        
        
         //console.log("player valid:"+peachGirl.valid);
         peachGirl.setActive(true);
         this.boss.setActive(true);
         oni.setActive(true);

        
        // start camera
        //this.cameras.main.setZoom(2.0);

        // Set first room boundaries.
        this.cameras.main.setBounds(this.rooms[peachGirl.currentRoom].x,
                                    this.rooms[peachGirl.currentRoom].y,
                                    this.rooms[peachGirl.currentRoom].width,
                                    this.rooms[peachGirl.currentRoom].height,
                                    true);

        this.cameras.main.startFollow(peachGirl);

        this.cameras.main.fadeIn(2000, 0, 0, 0);
        // this.oni = this.physics.add.sprite(32, centerY, 'oni');
        
        // //bun.width = 10;
        // //bun.body.height = 10;
        // //console.log("bun's width:"+bun.body.width);
        // //console.log("bun's height:"+bun.body.height);
        // bun.setSize(700, 700, true);
        // bun.setScale(0.09);
        
        
        // bun.setBounce(0.5);
        // bun.setImmovable();
        // bun.setMaxVelocity(600, 600);
        // //bun.setDragY(200);
        // bun.setDepth(1);         // ensures that bun z-depth remains above shadow buns
        // bun.destroyed = false;   // custom property to track bun life

        // this.anims.create({ 
        //     key: 'walk', 
        //     frames: this.anims.generateFrameNames('bun', {      
        //         prefix: 'walk1.png',
        //         start: 1,
        //         end: 3,
        //         suffix: '',
        //         //zeroPad: 4 
        //     }), 
        //     frameRate: 30,
        //     repeat: -1 
        // });

        // draw grid lines for jump height reference
        // let graphics = this.add.graphics();
        // graphics.lineStyle(2, 0x000000, 0.1);
	    // for(let y = game.config.height; y >= 0; y -= 64) {
        //     graphics.lineBetween(0, y, game.config.width, y);
        // }
        // for(let x = game.config.width; x >= 0; x -= 64) {
        //     if(x == 128 || x == game.config.width-128) {
        //         graphics.lineStyle(2, 0xFF0000, 0.5);
        //         graphics.lineBetween(x, 0, x, game.config.height);
        //     }else{
        //         graphics.lineStyle(2, 0x000000, 0.1);
        //         graphics.lineBetween(x, 0, x, game.config.height);
        //     }
            
        // }
        var UIbox = this.add.rectangle(128, 0, 704, 128, 0x0000FF).setOrigin(0, 0);
        
        //console.log(this.moveBar.type);
        
        this.cont = this.add.container();

        this.cont.add([UIbox, peachGirl.lifeBar,peachGirl.moveBar]);
        //this.cont.add(this.moveBar);
        //console.log(this.cont.type);
        //var customBounds = new Phaser.Geom.Rectangle(128, 128, 704, game.config.height-128);
        this.cont.setScrollFactor(0);
        
        
        //  this.input.on('pointerup', function(pointer) {
        //     //if(!this.gameOver){
        //        peachGirl.valid = true;
        //        //this.p1Rocket.sfxRocket.play(); // play sfx
        //     //}
            
        //  }, this);
         
        // set up barrier group and add first barrier to kick things off
        this.yokaiGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        this.yokaiGroup.add(oni);
        this.yokaiGroup.add(this.boss);
        //this.addYokai();
        //.log(Phaser.Math.SinCosTable);
        
    }

    addYokai() {
        this.yokaiGroup.add(barrier); 
    }
    addBarrier() {
        let barrier = new Barrier(this, this.barrierSpeed, Phaser.Math.RND.pick(['plate', 'soysauce', 'teapot', 'porkbunsteamer', 'shrimpdumplingsteamer'])).setScale(0.4).setOrigin(0.5, 0.5);     // create new barrier
        //barrier.body.setCircle(190, 260, 230);
        this.barrierGroup.add(barrier);                         // add it to existing group
    }

    addPowerups() {
        let powerup = null;
        let spawnChance = Math.random();
        if(spawnChance <= 0.6) {
            powerup = 'normal';
            
        }else if(spawnChance <= 0.8) {
            powerup = 'gooey';
        }else if(spawnChance <= 0.9) {
            powerup = 'runny';
        }else {
            powerup = 'chili';
        }
        powerups = new Powerups(this, -500, powerup).setScale(0.1).setOrigin(1,1);     // create new barrier
        powerups.body.setCircle(190, 260, 230);
        this.powerupsGroup.add(powerups);                         // add it to existing group
    }

    addPeople() {
        let people = new People(this, -200, 'people', Phaser.Math.RND.pick(['upper', 'mid', 'bottom'])).setScale(0.5).setOrigin(1,0.5);     // create new barrier
        this.peopleGroup.add(people);
    }
    
    suddenE() {
        //console.log('sudden in function ='+suddentype);
        if(suddentype == 'chopsticks') {
            
            sudden = new Sudden(this, 500, -50, Phaser.Math.Between(0+200, game.config.height - 200), 'ChopstickHand').setScale(0.5).setOrigin(0.5,0.5);     // create new barrier
            sudden.anims.play('chop'); 
        }else if(suddentype == 'fork') {
            sudden = new Sudden(this, -500, Phaser.Math.Between(0+150, game.config.width - 150), Phaser.Math.RND.pick([0, game.config.height]), 'ForkHand').setScale(0.5).setOrigin(0.5,0.5);     // create new barrier
        }
        
        //sudden.body.setCircle(190, 260, 230);
        this.suddenGroup.add(sudden);                         // add it to existing group
    }

    countDown() {
        this.timeLeft --;
 
        // dividing enery bar width by the number of seconds gives us the amount
        // of pixels we need to move the energy bar each second
        //let stepWidth = this.energyMask.displayWidth / gameOptions.initialTime;
        let stepWidth = this.yolkMask.displayWidth / 60;
        // moving the mask
        this.yolkMask.x -= stepWidth;
        if(this.timeLeft <= 0){
            //paddle.destroyed = true;                    // turn off collision checking
            this.difficultyTimer.destroy();             // shut down timer
            this.sound.play('Death', { volume: 0.5 });  // play death sound
            

            // create particle explosion
            let deathParticles = this.add.particles('fragment');
            let deathEmitter = deathParticles.createEmitter({
                tint: 0xF9BB1F,
                alpha: { start: 1, end: 0 },
                scale: { start: 0.75, end: 0 },
                speedX: { min: -50, max: 500 },
                speedY: { min: -500, max: 500 },
                lifespan: 1500
            });

            // make it boom 💥
            deathEmitter.explode(150, bun.x, bun.y);
            // kill paddle
            bun.destroy();                           
             // switch states after timer expires
              this.time.delayedCall(2500, () => { this.scene.start('gameOverScene'); });
            //this.scene.start('gameOverScene');
        }
    }

    timerE() {
        //console.log("actual random:"+this.randomTime);
        this.randomTime -= 1;
        if(this.randomTime > 0) {
            this.suddenTimer.text = this.randomTime+" S";
        }else {
            this.suddenTimer.text = 'NOW!';
        }
        
    }

    addSudden() {
        
        this.suddenE();
        suddentype = Phaser.Math.RND.pick(['chopsticks', 'fork']);
        //console.log("new sudden:"+suddentype);
        if(suddentype == 'chopsticks') {
            this.chopsticks.alpha = 1;
            this.fork.alpha = 0;
        }else if(suddentype == 'fork') {
            this.chopsticks.alpha = 0;
            this.fork.alpha = 1;
        }
        if(this.hardMODE) {
            this.randomTime = Phaser.Math.Between(4,8);
        }else if(this.extremeMODE) {
            this.randomTime = Phaser.Math.Between(1,3);
        }else{
            this.randomTime = Phaser.Math.Between(9,12);
        }
        //console.log("new random:"+this.randomTime);
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

    update() {
        //console.log("player valid:"+peachGirl.valid);
        peachGirl.update();
        this.boss.update();
        // this.physics.world.collide(peachGirl, this.floorLayer, ()=>{
        //     console.log("hello");
        // }, null, this);
        if (peachGirl.roomChange) {

            this.cameras.main.fadeOut(250, 0, 0, 0, function(camera, progress) {
                peachGirl.canMove = false;
                if (progress === 1) {
                    // Change camera boundaries when fade out complete.
                    this.cameras.main.setBounds(this.rooms[peachGirl.currentRoom].x,
                                                this.rooms[peachGirl.currentRoom].y,
                                                this.rooms[peachGirl.currentRoom].width,
                                                this.rooms[peachGirl.currentRoom].height,
                                                true);

                    // Fade back in with new boundareis.
                    this.cameras.main.fadeIn(500, 0, 0, 0, function(camera, progress) {
                        if (progress === 1) {
                            peachGirl.canMove = true;
                            console.log("current room:"+peachGirl.currentRoom)
                            this.roomStart(peachGirl.currentRoom);
                        }
                    }, this);
                }
            }, this);
        }


        this.physics.add.collider(peachGirl, scaleLayer);
        this.physics.add.collider(this.yokaiGroup, scaleLayer);
        // this.gooeyAnim.play('leak', true);
        // this.gooeyAnim.x = bun.x - 25;
        // this.gooeyAnim.y = bun.y;

        // this.runnyAnim.play('leak1', true);
        // this.runnyAnim.x = bun.x - 25;
        // this.runnyAnim.y = bun.y;

        // //console.log("this.yolkMask.x: "+this.yolkMask.x);

        // this.background.tilePositionX += 4;
        // this.people.tilePositionX += 28;

        

        // // spawn rainbow trail if in EXTREME mode
        // //if(this.extremeMODE && !this.shadowLock && !bun.destroyed) {
        // if(!this.shadowLock && this.extremeMODE) {
        //     this.spawnShadowPaddles();
        //     this.shadowLock = true;
        //     // lock shadow bun spawning to a given time interval
        //     this.time.delayedCall(15, () => { this.shadowLock = false; })
        // }
    }

    levelBump() {
        // increment level (aka score)
        level++;

        // bump speed every 5 levels
        if(level % 5 == 0) {
            //console.log(`level: ${level}, speed: ${this.barrierSpeed}`);
            //this.sound.play('clang', { volume: 0.75 });         // play clang to signal speed up
            if(this.barrierSpeed >= this.barrierSpeedMax) {     // increase barrier speed
                this.barrierSpeed -= 25;
                bgm.rate += 0.01;                          // increase bgm playback rate (ドキドキ)
            }
        }
        // set HARD mode
        if(level == 45) {
            this.hardMODE = true;
        }
        // set EXTREME mode
        if(level == 70) {
            //paddle.scaleY = 0.5;
            this.hardMODE = false;
            this.extremeMODE = true;
        }
    }

    spawnShadowPaddles() {
        // add a "shadow paddle" at main paddle position
        let shadowPaddle = this.add.image(bun.x, bun.y, 'bun').setOrigin(0.5);
        shadowPaddle.scaleX = bun.scaleX;
        shadowPaddle.scaleY = bun.scaleY;            // scale to parent paddle
        //shadowPaddle.tint = Math.random() * 0xFFFFFF;   // tint w/ rainbow colors
        shadowPaddle.tint = 0xF9BB1F;

        shadowPaddle.alpha = 0.5;                       // make semi-transparent
        // tween alpha to 0
        this.tweens.add({ 
            targets: shadowPaddle, 
            alpha: { from: 0.5, to: 0 }, 
            duration: 750,
            ease: 'Linear',
            repeat: 0 
        });
        // set a kill timer for trail effect
        this.time.delayedCall(750, () => { shadowPaddle.destroy(); } );
    }

    barrierCollision() {
        //console.log("time before:"+this.timeLeft);
        this.sound.play('Hit', { volume: 0.5 });
        this.timeLeft -= 4;
        //console.log("time after:"+this.timeLeft);
        this.yolkMask.x -= 4 * this.yolkMask.displayWidth / (60);
        //this.gameTimer.remove();
        // this.gameTimer = this.time.addEvent({
        //     delay: 1000,
        //     callback: this.countDown,
        //     callbackScope: this,
        //     loop: true
        // });
        
        // switch states after timer expires
        //this.time.delayedCall(3000, () => { this.scene.start('gameOverScene'); });
    }

    
    powerupsCollision(bun, powerups){

        powerups.sfxpower.play();
        powerups.disableBody(true, true);
        this.time.delayedCall(3000, () => {
            this.addPowerups();
        }, null, this);
        
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

    roomStart(roomNumber) {
        if (roomNumber == 4) {
            this.cameras.main.shake(2500, 0.001, true);
        }
    }
}
