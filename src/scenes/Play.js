class Play extends Phaser.Scene {
   constructor() {
      super('playScene');
   }

   create() {
      //console.log("play: "+this);
      //this.textures.getFrame
      this.scene.run('gameUI');
      this.scene.run('Instruction');
      this.sceneB = this.scene.get('gameUI');
      //game.scale.resize(960, 1200);
      
       // set up audio, play bgm
       bgm = this.sound.add('bgm', { 
         mute: false,
         volume: 0.5,
         rate: 0.8,
         loop: true 
     });
     bgm.play();
    
     

      //    this.hearts = this.add.group({
      //       runChildUpdate: true,   // make sure update runs on group children
      //       //classType: Phaser.GameObjects.Image
      //    })
      //    console.log(this.hearts);
      //    //this.hearts.crea
      //    this.hearts.createMultiple({
      //       key: 'ui_heart_full',
            
      //       setXY: {
      //          x: 30,
      //          y: 30,
      //          stepX: 30
      //       },
      //       quantity: 1

      //    })
      
      this.anims.create({
         key: 'critical',
         frames: this.anims.generateFrameNumbers('critattack', { start: 0, end: 3}),
         frameRate: 5
      });

      this.anims.create({
         key: 'flawless',
         frames: this.anims.generateFrameNumbers('flawlessdefense', { start: 0, end: 10}),
         frameRate: 10
      });

      this.anims.create({
         key: 'chestPickups',
         frames: this.anims.generateFrameNumbers('chestPickups', { start: 0, end: 4}),
         frameRate: 10
      });

      
      this.anims.create({
         key: 'chestSpecial',
         frames: this.anims.generateFrameNumbers('chestSpecial', { start: 0, end: 4}),
         frameRate: 10
      });
      this.anims.create({
         key: 'death',
         frames: this.anims.generateFrameNumbers('death', { start: 0, end: 3}),
         frameRate: 5
      });

      this.anims.create({ 
         key: 'playerWalk', 
         frames: this.anims.generateFrameNames('PeachGirl_walk', {      
             prefix: 'PeachGirl_walk',
             start: 0,
             end: 1,
             suffix: '',
             //zeroPad: 4 
         }), 
         frameRate: 10,
         repeat: -1 
     });
      this.anims.create({ 
         key: 'playerAttack', 
         frames: this.anims.generateFrameNames('PeachGirl_attack', {      
             prefix: 'PeachGirl_attack',
             start: 0,
             end: 2,
             suffix: '',
             //zeroPad: 4 
         }), 
         frameRate: 10,
         repeat: 0 
     });
      this.anims.create({
         key: 'playerIdle',
         frames: this.anims.generateFrameNames('PeachGirl_idle', {      
            prefix: 'PeachGirl_idle',
            start: 0,
            end: 2,
            suffix: '',
            //zeroPad: 4 
        }), 
        frameRate: 10,
        repeat: -1 
     });
     this.anims.create({
      key: 'playerDeath',
      frames: this.anims.generateFrameNumbers('PeachGirl_death', { start: 0, end: 5}),
      frameRate: 15,
      repeat: 0
   });

   this.anims.create({
      key: 'playerStun',
      frames: this.anims.generateFrameNumbers('PeachGirl_stun', { start: 0, end: 3}),
      frameRate: 15,
      repeat: -1
   });
     this.anims.create({
      key: 'firewheel_walk',
      frames: this.anims.generateFrameNumbers('firewheel_walk', { start: 0, end: 2}),
      frameRate: 10,
      repeat: -1
   });
     this.anims.create({ 
      key: 'oxheaded_walk', 
      frames: this.anims.generateFrameNames('oxheaded_walk', {      
          prefix: 'oxheaded_walk',
          start: 0,
          end: 1,
          suffix: '',
          //zeroPad: 4 
      }), 
      frameRate: 10,
      repeat: -1 
  });

   this.anims.create({ 
      key: 'oxheaded_attack', 
      frames: this.anims.generateFrameNames('oxheaded_attack', {      
         prefix: 'oxheaded_attack',
         start: 0,
         end: 3,
         suffix: '',
         //zeroPad: 4 
      }), 
      frameRate: 10,
      repeat: 0
   });

   this.anims.create({
      key: 'horsefaced_walk',
      frames: this.anims.generateFrameNumbers('horsefaced_walk', { start: 0, end: 1}),
      frameRate: 10,
      repeat: -1
   });

   this.anims.create({
      key: 'horsefaced_attack',
      frames: this.anims.generateFrameNumbers('horsefaced_attack', { start: 0, end: 3}),
      frameRate: 10,
   });

   this.anims.create({
      key: 'monkkid_walk',
      frames: this.anims.generateFrameNumbers('monkkid_walk', { start: 0, end: 1}),
      frameRate: 10,
      repeat: -1
   });

   this.anims.create({
      key: 'monkkid_attack',
      frames: this.anims.generateFrameNumbers('monkkid_attack', { start: 0, end: 3}),
      frameRate: 5,
   });

   this.anims.create({
      key: 'heavenlydog_walk',
      frames: this.anims.generateFrameNumbers('heavenlydog_walk', { start: 0, end: 2}),
      frameRate: 10,
      repeat: -1
   });

   this.anims.create({
      key: 'heavenlydog_attack',
      frames: this.anims.generateFrameNumbers('heavenlydog_attack', { start: 0, end: 3}),
      frameRate: 10,
   });

   this.anims.create({
      key: 'heavenlydog_summon',
      frames: this.anims.generateFrameNumbers('heavenlydog_summon', { start: 0, end: 3}),
      frameRate: 10,
   });

   this.anims.create({
      key: 'heavenlydog_tornado',
      frames: this.anims.generateFrameNumbers('heavenlydog_tornado', { start: 0, end: 4}),
      frameRate: 10,
      repeat: -1
   });

   this.anims.create({
      key: 'air_effect',
      frames: this.anims.generateFrameNumbers('air_effect', { start: 0, end: 2}),
      frameRate: 10,
      repeat: -1
   });

   this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 5}),
      frameRate: 10,
      repeat: 0
   });

   this.anims.create({
      key: 'lightning',
      frames: this.anims.generateFrameNumbers('lightning', { start: 0, end: 5}),
      frameRate: 10,
      repeat: 0
   });

   this.anims.create({
      key: 'moonbeamHorizontal',
      frames: this.anims.generateFrameNumbers('moonbeamHorizontal', { start: 0, end: 5}),
      frameRate: 10,
      repeat: 0
   });

   this.anims.create({
      key: 'moonbeamVertical',
      frames: this.anims.generateFrameNumbers('moonbeamVertical', { start: 0, end: 5}),
      frameRate: 10,
      repeat: 0
   });
      // add a tile map
      const map = this.add.tilemap("level-1"); 
      // add a tile set to the map
      const tileset = map.addTilesetImage("DragonTiles", "tiles", 64, 64);
      // create a static layer (ie, can't be modified)
      this.bgLayer = map.createStaticLayer("Ground", tileset, 0, 0);
      const weakLayer = map.createStaticLayer("Weak", tileset, 0, 0);

      const scaleLayer = map.createStaticLayer("Collisions", tileset, 0, 0);
      const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

      this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

      // set map collision
      //console.log(scaleLayer);
      scaleLayer.setCollisionByProperty({ collides: true });
console.log(map.widthInPixels, map.heightInPixels);
      // this.background = this.add.tileSprite(0, 0,  map.widthInPixels, map.heightInPixels, 'sky');
      
      this.rooms = [];
      this.airGroup = this.add.group({
 
         runChildUpdate: true    // make sure update runs on group children
     });
      this.wallGroup = this.physics.add.group({
         immovable: true,
         runChildUpdate: true    // make sure update runs on group children
      });
      this.yokaiGroup = this.add.group({
         runChildUpdate: true    // make sure update runs on group children
     });
     this.chestGroup = this.add.group({
      runChildUpdate: true    // make sure update runs on group children
  });

     this.bossGroup = this.add.group({
      runChildUpdate: true    // make sure update runs on group children
  });

  this.scaleGroup = this.add.group({
   runChildUpdate: true    // make sure update runs on group children
});

        // Loop through all the objects.
        map.findObject('Objects', function(object) {

            // rooms
            if (object.type === 'Room') {
               this.rooms.push(object);
            }

            // stairs
            if (object.name === 'Edges') {
               this.stairs.add(new Phaser.GameObjects.Sprite(this, object.x, object.y));
            }

            if (object.name === 'Player') {
               peachGirl = new Player(this, object.x, object.y).setOrigin(0.5, 0.5).setSize(18, 50, true);
               peachGirl.setDepth(1);
               //.setSize(32, 64, true).setScale(1.2);
               
            }
            // spawn points
            if (object.type === 'Spawn') {
               
               if (object.name === 'Firewheel') {
                  //console.log(this.time);
                  let firewheel = new Enemy(this, 'firewheel', object.x, object.y).setOrigin(0.5, 0.5).setSize(45, 45, true);
                  this.yokaiGroup.add(firewheel);
               }

               if (object.name === 'Oxhead') {
                  //console.log(this.time);
                  let firewheel = new Enemy(this, 'oxheaded', object.x, object.y).setOrigin(0.5, 0.5).setSize(40, 40, true).setScale(1.5);
                  this.yokaiGroup.add(firewheel);
               }

               if (object.name === 'Horseface') {
                  //console.log(this.time);
                  let firewheel = new Enemy(this, 'horsefaced', object.x, object.y).setOrigin(0.5, 0.5).setSize(40, 40, true).setScale(1.5);
                  this.yokaiGroup.add(firewheel);
               }

               if (object.name === 'Monk Kid') {
                  //console.log(this.time);
                  let firewheel = new Enemy(this, 'monkkid', object.x, object.y).setOrigin(0.5, 0.5).setSize(20, 40, true).setScale(1.3);
                  this.yokaiGroup.add(firewheel);
               }

               if (object.name === 'Heavenly Dog') {
                  //console.log(this.time);
                  let firewheel = new Enemy(this, 'heavenlydog', object.x, object.y).setOrigin(0.5, 0.5).setSize(30, 60, true).setScale(1.3);
                  this.yokaiGroup.add(firewheel);
               }

               if (object.name === 'Scale') {
                  //console.log(this.time);
                  let firewheel = new Enemy(this, 'weakscale', object.x, object.y).setOrigin(0.5, 0.5).setSize(30, 60, true).setScale(1);
                  this.scaleGroup.add(firewheel);
               }

            }

            if (object.type === 'Chest') {
               if (object.name === 'Chest') { // pickups
                  //console.log(this.time);
                  let chest = new Chest(this, 'chestPickups', object.x, object.y).setOrigin(0.5, 0.5).setSize(50, 45, true);
                  this.chestGroup.add(chest);
               }

               if (object.name === 'Special') { // special
                  //console.log(this.time);
                  let chest = new Chest(this, 'chestSpecial', object.x, object.y).setOrigin(0.5, 0.5).setSize(50, 45, true);
                  this.chestGroup.add(chest);
               }
            }

        }, this);
         // this.yokaiGroup.getChildren().forEach(function(item) {
         //    item.setCollideWorldBounds(true);
            
         // }); 
         // this.physics.world.disable();
        
         this.background = this.add.tileSprite(peachGirl.x, peachGirl.y,  11520*2, 8000, 'sky');
         this.background.setDepth(-1);

         this.weak = new Enemy(this, 'weakscale', 427, 2730).setOrigin(0.5, 0.5).setSize(30, 60, true).setScale(1);
         console.log(this.weak.frame.name);
         this.weak.setFrame(1);
         console.log(this.weak.frame.name);
         this.scaleGroup.add(this.weak);
      
        // initialize boss
        this.earthdragon = this.add.sprite(160*64, 19*64, 'earthdragon').setOrigin(0.5, 0.5).setScale(3.5).setAngle(-45).setDepth(1);
        this.bossGroup.add(this.earthdragon);

        this.airdragon = this.add.sprite(173*64, 19*64, 'airdragon').setOrigin(0.5, 0.5).setScale(3.5).setAngle(45).setDepth(1);
        this.bossGroup.add(this.airdragon);

        this.moondragon = this.add.sprite(160*64, 12*64, 'moondragon').setOrigin(0.5, 0.5).setScale(3.5).setAngle(-45).setDepth(1);
        this.bossGroup.add(this.moondragon);

        this.poisondragon = this.add.sprite(173*64, 12*64, 'poisondragon').setOrigin(0.5, 0.5).setScale(3.5).setAngle(45).setDepth(1);
        this.bossGroup.add(this.poisondragon);

        this.waterdragon = this.add.sprite(160*64, 5*64, 'waterdragon').setOrigin(0.5, 0.5).setScale(3.5).setAngle(-45).setDepth(1);
        this.bossGroup.add(this.waterdragon);

        this.firedragon = this.add.sprite(173*64, 5*64, 'firedragon').setOrigin(0.5, 0.5).setScale(3.5).setAngle(45).setDepth(1);
        this.bossGroup.add(this.firedragon);

        this.lightningdragon = this.add.sprite(167*64, 1*64, 'lightningdragon').setOrigin(0.5, 0.5).setScale(3.5).setDepth(1);
        this.bossGroup.add(this.lightningdragon);

        // boss particles
        this.earth = this.time.addEvent({
         delay: 2000,
         callback: ()=>{

            this.wall = this.addWall(Phaser.Math.Between(161*64, 171*64), Phaser.Math.Between(13*64, 20*64));
            this.time.delayedCall(5000, () => { this.wall.destroy(); });
             
         },
         callbackScope: this,
         loop: true
         //timeScale: 0.1
     });
     this.earth.paused = true;

     this.air = this.time.addEvent({
      delay: 3000,
      callback: ()=>{

         air_effect = new Particle(this, 100, 10200, Phaser.Math.Between(728, 1300), 'air_effect');
         // this.airGroup.add(air_effect);
         air_effect.anims.play('air_effect', true);   
          
      },
      callbackScope: this,
      loop: true
      //timeScale: 0.1
  });
  this.air.paused = true;

  this.fire = this.time.addEvent({
   delay: 3000,
   callback: ()=>{

      
      // fire_effect = new Particle(this, 100, Phaser.Math.Between(10336, 10976), Phaser.Math.Between(160, 710), 'explosion');
      fire_effect = new Particle(this, 100, Phaser.Math.Between(10400, 10976), Phaser.Math.Between(200, 710), 'explosion');
      // fire_effect = this.physics.add.sprite(10800, 500, 'explosion');
      // console.log(fire_effect);
      // this.airGroup.add(air_effect);
      fire_effect.setOrigin(0.5, 0.5).setSize(128, 128, true);
      fire_effect.anims.play('explosion', true);
          fire_effect.on('animationcomplete-explosion', () => {  // callback after animation completes
            fire_effect.destroy();
        }, this);
   },
   callbackScope: this,
   loop: true
   //timeScale: 0.1
});
this.fire.paused = true;

this.lightning = this.time.addEvent({
   delay: 3000,
   callback: ()=>{

      
      // fire_effect = new Particle(this, 100, Phaser.Math.Between(10336, 10976), Phaser.Math.Between(160, 710), 'explosion');
      lightning_effect = new Particle(this, 100, Phaser.Math.Between(10400, 10976), Phaser.Math.Between(200, 550), 'lightning');
      // lightning = this.physics.add.sprite(10800, 500, 'explosion');
      // console.log(lightning_effect);
      // this.airGroup.add(air_effect);
      // lightning.setOrigin(0.5, 0.5).setSize(128, 128, true);
      lightning_effect.anims.play('lightning', true);
      lightning_effect.on('animationcomplete-lightning', () => {  // callback after animation completes
         lightning_effect.destroy();
        }, this);
   },
   callbackScope: this,
   loop: true
   //timeScale: 0.1
});
this.lightning.paused = true;

this.moon = this.time.addEvent({
   delay: 3000,
   callback: ()=>{

      let spawnChance = Math.random();
      if(spawnChance <= 0.5) {
         moon_effect = new Particle(this, 100, 10600, Phaser.Math.Between(670, 950), 'moonbeamHorizontal');
         
      }else {
         moon_effect = new Particle(this, 100, Phaser.Math.Between(10400, 10976), 664, 'moonbeamVertical');
      }
      
      // fire_effect = new Particle(this, 100, Phaser.Math.Between(10336, 10976), Phaser.Math.Between(160, 710), 'explosion');
      
      // lightning = this.physics.add.sprite(10800, 500, 'explosion');
      console.log(moon_effect);
      // this.airGroup.add(air_effect);
      // lightning.setOrigin(0.5, 0.5).setSize(128, 128, true);
      if(moon_effect.texture.key == 'moonbeamHorizontal') {
         moon_effect.anims.play('moonbeamHorizontal', true);
         moon_effect.on('animationcomplete-moonbeamHorizontal', () => {  // callback after animation completes
            moon_effect.destroy();
        }, this);
      }else {
         moon_effect.anims.play('moonbeamVertical', true);
         moon_effect.on('animationcomplete-moonbeamVertical', () => {  // callback after animation completes
            moon_effect.destroy();
        }, this);
      }
         
      
   },
   callbackScope: this,
   loop: true
   //timeScale: 0.1
});
this.moon.paused = true;

     this.slow = this.add.image(peachGirl.x-15, peachGirl.y-45, 'slow').setVisible(false);
     this.more = this.add.image(peachGirl.x+15, peachGirl.y-45, 'poison').setVisible(false);

        // Add collisions.
        this.physics.add.collider(peachGirl, scaleLayer);
        this.physics.add.collider(this.yokaiGroup, scaleLayer);
        this.physics.add.collider(this.yokaiGroup, this.yokaiGroup);
        
        
        this.physics.add.overlap(peachGirl, this.Edges, function() {
            peachGirl.onEdges = true;
        }, null, this);


        
        // start camera
        this.cameras.main.setZoom(1.5);

        // Set first room boundaries.
        this.cameras.main.setBounds(this.rooms[peachGirl.currentRoom].x,
                                    this.rooms[peachGirl.currentRoom].y,
                                    this.rooms[peachGirl.currentRoom].width,
                                    this.rooms[peachGirl.currentRoom].height,
                                    true);

        this.cameras.main.startFollow(peachGirl, true);

        this.cameras.main.fadeIn(2000, 0, 0, 0);

        //var UIbox = this.add.rectangle(300, 150, 704, 128, 0xFFFFFF).setOrigin(0, 0);
        //this.cont = this.add.container();

      //   this.cont.add([peachGirl.ATK, peachGirl.DFS,peachGirl.moveBar, this.heart]);
      //   this.cont.setScrollFactor(0);
        //peachGirl.body.setImmovable(true);
   }

   update() {
      
      console.log(this.weak.health, this.weak.immune);
      this.background.tilePositionX += 2;
      this.background.tilePositionY += 2;
      this.slow.x = peachGirl.x-15;
      this.slow.y = peachGirl.y-45;
      this.more.x = peachGirl.x+15;
      this.more.y = peachGirl.y-45;
      // console.log(peachGirl.speed);
      this.physics.add.collider(peachGirl, this.wallGroup);
      this.physics.collide(peachGirl, this.wallGroup);
      
      this.physics.add.collider(peachGirl, air_effect);
      // this.physics.collide(peachGirl, air_effect, ());
      this.physics.world.collide(peachGirl, air_effect, null, null, this);
      // if(fire_effect != null)
      //    fire_effect.update();
      // console.log(peachGirl);
      //    console.log(fire_effect);
      if(fire_effect!=null)
         this.physics.world.collide(fire_effect, peachGirl, this.particleCollision, null, this);

      if(lightning_effect!=null)
         this.physics.world.collide(lightning_effect, peachGirl, this.particleCollision, null, this);
      // this.physics.world.collide(peachGirl, this.airGroup, this.airCollision, null, this);
      
      // console.log(this.cameras.main.worldView.contains(this.waterdragon.x, this.waterdragon.y));
      peachGirl.update();
      
      //console.log("player:"+peachGirl.body.immovable);
      this.yokaiGroup.getChildren().forEach(function(item) {
         //console.log("enemy:"+item.body.immovable);
         item.update();
      }); 

      this.chestGroup.getChildren().forEach(function(item) {
         //console.log("enemy:"+item.body.immovable);
         item.update();
      }); 

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
                           this.roomStart(peachGirl.currentRoom);
                     }
                  }, this);
               }
         }, this);
      }
      
      if(peachGirl.currentRoom == 5) { 
         
         if(this.cameras.main.worldView.contains(this.earthdragon.x, this.earthdragon.y)) {
            //console.log("should be");
            peachGirl.setImmovable(false);
            this.earth.paused = false;
         }else {
            peachGirl.setImmovable(true);
            this.earth.paused = true;
         }

         if(this.cameras.main.worldView.contains(this.airdragon.x, this.airdragon.y)) {
            peachGirl.setImmovable(false);
            
            this.air.paused = false;
         }else {
            peachGirl.setImmovable(true);
            this.air.paused = true;
         }

         if(this.cameras.main.worldView.contains(this.firedragon.x, this.firedragon.y)) {
            this.fire.paused = false;
         }else {
            this.fire.paused = true;
         }

         if(this.cameras.main.worldView.contains(this.lightningdragon.x, this.lightningdragon.y)) {
            this.lightning.paused = false;
         }else {
            this.lightning.paused = true;
         }

         if(this.cameras.main.worldView.contains(this.moondragon.x, this.moondragon.y)) {
            this.moon.paused = false;
         }else {
            this.moon.paused = true;
         }

         if(this.cameras.main.worldView.contains(this.waterdragon.x, this.waterdragon.y)) {
            this.water();
         }else {
            peachGirl.speed = 200;
            this.slow.setVisible(false);
         }

         if(this.cameras.main.worldView.contains(this.poisondragon.x, this.poisondragon.y)) {
            //console.log("should be");
            this.poison();
         }else {
            peachGirl.consumption = 0.05;
            this.more.setVisible(false);
         }
         
         
            

      }

      // console.log(this.time.now, this.earthCD);
      // if(this.time.now - this.earthCD > 1000) {
      //    this.addWall(Phaser.Math.Between(161*64, 171*64), Phaser.Math.Between(13*64, 20*64));
      // }
      // console.log(peachGirl.speed);
   }

   
   roomStart(roomNumber) {
      if (roomNumber == 4) {
          this.cameras.main.shake(2500, 0.001, true);
      }
   }

   airCollision(peachGirl, air) {

      peachGirl.setVelocity(300,0);
 
   }

   addWall(x, y) {
      
        

        // place tile marker in world space, and snap it to the tile grid
        // first, convert world coordinates (pixels) to tile coordinates
        // https://photonstorm.github.io/phaser3-docs/Phaser.Tilemaps.StaticTilemapLayer.html#worldToTileXY__anchor
        const pointerTileXY = this.bgLayer.worldToTileXY(x, y);
        // next, convert tile coordinates back to world coordinates (pixels)
        // https://photonstorm.github.io/phaser3-docs/Phaser.Tilemaps.StaticTilemapLayer.html#tileToWorldXY__anchor
        const snappedWorldPoint = this.bgLayer.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);
        let wall = this.wallGroup.create(snappedWorldPoint.x, snappedWorldPoint.y, 'wall').setOrigin(0);
      //   let wall = this.physics.add.sprite(snappedWorldPoint.x, snappedWorldPoint.y, 'wall').setImmovable();
      
        return wall;
   }

   water() {
      peachGirl.speed = 100;
      this.slow.setVisible(true);
     
   }

   poison() {
      peachGirl.consumption = 0.1;
      this.more.setVisible(true);
      // console.log(peachGirl.consumption);
      // peachGirl.consumption = peachGirl.consumption*2;
   }

   particleCollision(particle, peachGirl) {
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
              flawless = peachGirl.scene.add.sprite(peachGirl.x, peachGirl.y, "flawlessdefense").setScale(0.8);
                  flawlesstext = peachGirl.scene.add.sprite(peachGirl.x, peachGirl.y, "flawlessDefenseText").setScale(0.8);
              flawless.anims.play('flawless', true);
              peachGirl.scene.time.delayedCall(1100, () => { 
                  flawless.destroy();
                  flawlesstext.destroy();

              });
              
          }else {
              peachGirl.life--;
              if(particle.texture.key==='lightning') {
                  peachGirl.isStun = true;
                  peachGirl.anims.play('playerStun', true);
              }
              peachGirl.tint = 0xFF0000;
              //console.log(peachGirl);
              //peachGirl.playerCD.remove();
              peachGirl.scene.cameras.main.shake(500, 0.001, true);
              peachGirl.scene.time.delayedCall(500, () => { peachGirl.tint = 0xFFFFFF; });

              //peachGirl.scene.time.delayedCall(500, () => { this.body.setSize(32,64,true); });
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
            
          
      }
              
      peachGirl.immune = true;
          peachGirl.playerCD.remove();
          peachGirl.playerCD = peachGirl.scene.time.addEvent({
              delay: 1000,
              callback: ()=>{
                  peachGirl.immune = false;
                  peachGirl.isStun = false;
              },
              callbackScope: this,
              // loop: true
              //timeScale: 0.1
          });
      // }else {

      // }
      
          
  }
}