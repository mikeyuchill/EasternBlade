class Chest extends Phaser.Physics.Arcade.Sprite {
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

       this.type = type;
       this.scene = scene;
       this.isopen = false;
       this.gametime;
       this.powerup = null;
       
       //this.velocity = velocity;
       //this.sfxpower = scene.sound.add('Effect').setVolume(0.1); // add powerup sfx
       
   }

   create() {
      this.pick = null;
   }

   update() {
      //super.update();
      // console.log(this.powerup);
      if(this.pick == null){
         //console.log("makeeee");
         this.scene.physics.world.collide(this, peachGirl, this.chestCollision, null, this.scene);
      }
         
      else if(this.pick != null){
         //console.log("makeeee");
         this.scene.physics.world.overlap(this.pick, peachGirl, this.powerupsCollision, null, peachGirl.scene);
      }
         
      if(this.isopen && this.scene.time.now - this.gametime > 500) {
         this.pick = this.scene.physics.add.sprite(this.x+20, this.y+30, this.powerup).setOrigin(0.5, 0.5).setSize(40, 40, true);
         this.isopen = false;
      }
   }

   chestCollision(chest, peachGirl){
      chest.isopen = true;
      chest.gametime = peachGirl.scene.time.now;
      //powerups.sfxpower.play();
      if(chest.type === 'chestPickups') {
         chest.anims.play('chestPickups', true);
      }else {
         chest.anims.play('chestSpecial', true);
      }
      
      chest.on('animationcomplete', () => {  // callback after animation completes
         chest.disableBody(true, true);
         
      }, this);

      
      //chest.destroy();
      //peachGirl.scene.add
      
      let spawnChance = Math.random();
      console.log("spawnChance: "+spawnChance);
      if(chest.type === 'chestPickups') {
         if(spawnChance <= 0.35) {
            chest.powerup = 'extramove';
            
         }else if(spawnChance <= 0.7) {
            chest.powerup = 'extralife';
         }else if(spawnChance <= 0.8) {
            chest.powerup = 'peachsword';
         }else if(spawnChance <= 0.9) {
            chest.powerup = 'peachshield';
         }else {
            chest.powerup = 'peachmirror';
         }
      }else {
         if(spawnChance <= 1/7) {
            chest.powerup = 'airimmunity';
            
         }else if(spawnChance <= 2/7) {
            chest.powerup = 'earthimmunity';
         }else if(spawnChance <= 3/7) {
            chest.powerup = 'fireimmunity';
         }else if(spawnChance <= 4/7) {
            chest.powerup = 'lightningimmunity';
         }else if(spawnChance <= 5/7) {
            chest.powerup = 'moonimmunity';
         }else if(spawnChance <= 6/7) {
            chest.powerup = 'poisonimmunity';
         }else {
            chest.powerup = 'waterimmunity';
         }
      }
        
      //new Powerups(peachGirl.scene, powerup, chest.x+20, chest.y+20);
      
      
      // console.log(chest);
      

      // peachGirl.scene.tweens.add({
      //    targets: chest.pick,
      //    alpha: 0,
      //    ease: 'Back.easeOut',  
      //    duration: 500,
      //    repeat: 0,
      //    yoyo: true
      // });
      // peachGirl.scene.time.delayedCall(10000, () => { 
      //    peachGirl.scene.physics.add.existing(chest.pick);
      //    chest.pick.setImmovable();
      // });
      //peachGirl.scene.physics.world.enable(chest.pick);
      
   }

   powerupsCollision(powerups, peachGirl){
      console.log(powerups);
      //powerups.sfxpower.play();
      powerups.disableBody(true, true);
      // this.time.delayedCall(3000, () => {
      //     this.addPowerups();
      // }, null, this);

      //this.powerupsGroup.remove(powerups, true);

      //console.log(powerups.eat);
      //console.log('type:'+powerups.functionality);
      if(powerups.texture.key==='extramove') {
         moveBar.increase(peachGirl.recovery);
      }else if(powerups.texture.key==='extralife') {
         peachGirl.life += 4;
      }else if(powerups.texture.key==='peachsword') {
         peachGirl.attack += 10;
      }else if(powerups.texture.key==='peachshield') {
         peachGirl.defense += 10;
      }else { // peachmirror
         peachGirl.recovery += 10;
          
      }

   }
}