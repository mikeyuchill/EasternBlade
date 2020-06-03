class Play extends Phaser.Scene {
   constructor() {
      super('playScene');
   }

   create() {
      //console.log("play: "+this);
      //this.textures.getFrame
      this.scene.run('gameUI');
      //this.scene.run('Boss');

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
   this.physics.add.overlap
      // add a tile map
      const map = this.add.tilemap("level-1"); 
      // add a tile set to the map
      const tileset = map.addTilesetImage("DragonTiles", "tiles", 64, 64);
      // create a static layer (ie, can't be modified)
      const bgLayer = map.createStaticLayer("Ground", tileset, 0, 0);
      const weakLayer = map.createStaticLayer("Weak", tileset, 0, 0);

      const scaleLayer = map.createStaticLayer("Collisions", tileset, 0, 0);
      const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

      this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

      // set map collision
      //console.log(scaleLayer);
      scaleLayer.setCollisionByProperty({ collides: true });

      this.rooms = [];
      this.Edges = this.physics.add.group();
      this.yokaiGroup = this.add.group({
         runChildUpdate: true    // make sure update runs on group children
     });

     this.bossGroup = this.add.group({
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
               //.setSize(32, 64, true).setScale(1.2);
            }
            // spawn points
            if (object.type === 'Spawn') {
               
               if (object.name === 'Firewheel') {
                  //console.log(this.time);
                  let firewheel = new Enemy(this, 'firewheel', object.x, object.y);
                  this.yokaiGroup.add(firewheel);
               }

               if (object.name === 'Oxhead') {
                  //console.log(this.time);
                  let firewheel = new Enemy(this, 'oxheaded', object.x, object.y).setOrigin(0.5, 0.5).setScale(1.5);
                  this.yokaiGroup.add(firewheel);
               }

               if (object.name === 'Horseface') {
                  //console.log(this.time);
                  let firewheel = new Enemy(this, 'horsefaced', object.x, object.y);
                  this.yokaiGroup.add(firewheel);
               }

               if (object.name === 'Monk Kid') {
                  //console.log(this.time);
                  let firewheel = new Enemy(this, 'monkkid', object.x, object.y);
                  this.yokaiGroup.add(firewheel);
               }

               if (object.name === 'Heavenly Dog') {
                  //console.log(this.time);
                  let firewheel = new Enemy(this, 'heavenlydog', object.x, object.y);
                  this.yokaiGroup.add(firewheel);
               }

            }

        }, this);
         // this.yokaiGroup.getChildren().forEach(function(item) {
         //    item.setCollideWorldBounds(true);
            
         // }); 
        
        // initialize boss
        this.waterdragon = this.add.sprite(160*64, 20*64, 'waterdragon').setOrigin(0.5, 0.5).setScale(3).setAngle(-45);
        this.bossGroup.add(this.waterdragon);

        this.poisondragon = this.add.sprite(172*64, 20*64, 'poisondragon').setOrigin(0.5, 0.5).setScale(3).setAngle(45);
        this.bossGroup.add(this.poisondragon);


        // Add collisions.
        this.physics.add.collider(peachGirl, scaleLayer);
        this.physics.add.collider(this.yokaiGroup, scaleLayer);
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

        this.cameras.main.startFollow(peachGirl);

        this.cameras.main.fadeIn(5000, 0, 0, 0);

        //var UIbox = this.add.rectangle(300, 150, 704, 128, 0xFFFFFF).setOrigin(0, 0);
        //this.cont = this.add.container();

      //   this.cont.add([peachGirl.ATK, peachGirl.DFS,peachGirl.moveBar, this.heart]);
      //   this.cont.setScrollFactor(0);
        //peachGirl.body.setImmovable(true);
   }

   update() {
      // console.log(peachGirl.speed);
      // console.log(this.cameras.main.worldView.contains(this.waterdragon.x, this.waterdragon.y));
      peachGirl.update();
      //console.log("player:"+peachGirl.body.immovable);
      this.yokaiGroup.getChildren().forEach(function(item) {
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
                           this.roomStart(peachGirl.currentRoom, this);
                     }
                  }, this);
               }
         }, this);
      }
      
      

      
   }

   
   roomStart(roomNumber, scene) {
      if (roomNumber == 4) {
          this.cameras.main.shake(2500, 0.001, true);
      } else if (roomNumber == 5) {
         console.log("here");
         if(this.cameras.main.worldView.contains(scene.waterdragon.x, scene.waterdragon.y)) {
            this.water();
         }else {
            peachGirl.speed = 200;
         }

         if(this.cameras.main.worldView.contains(scene.poisondragon.x, scene.poisondragon.y)) {
            console.log("should be");
            this.poison();
         }
      }
   }

   water() {
      peachGirl.speed /= 2;
   }

   poison() {
      this.moveBar.decrease(5);
   }
}