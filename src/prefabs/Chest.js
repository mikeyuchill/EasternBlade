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
       
       //this.velocity = velocity;
       //this.sfxpower = scene.sound.add('Effect').setVolume(0.1); // add powerup sfx
       
   }

   create() {
      this.pick = null;
   }

   update() {
      //super.update();
      //console.log(this.pick);
      if(this.pick == null){
         //console.log("makeeee");
         this.scene.physics.world.overlap(this, peachGirl, this.chestCollision, null, this.scene);
      }
         
      else if(this.pick != null){
         //console.log("makeeee");
         this.scene.physics.world.collide(this.pick, peachGirl, ()=>{console.log("good");}, null, peachGirl.scene);
      }
         
   }

   chestCollision(chest, peachGirl){

      //powerups.sfxpower.play();

      chest.disableBody(true, true);
      //chest.destroy();
      //peachGirl.scene.add
      let powerup = null;
      let spawnChance = Math.random();
      console.log("spawnChance: "+spawnChance);
      if(chest.type === 'chestPickups') {
         if(spawnChance <= 0.35) {
            powerup = 'extramove';
            
         }else if(spawnChance <= 0.7) {
            powerup = 'extralife';
         }else if(spawnChance <= 0.8) {
            powerup = 'peachsword';
         }else if(spawnChance <= 0.9) {
            powerup = 'peachshield';
         }else {
            powerup = 'peachmirror';
         }
      }else {
         if(spawnChance <= 1/7) {
            powerup = 'airimmunity';
            
         }else if(spawnChance <= 2/7) {
            powerup = 'earthimmunity';
         }else if(spawnChance <= 3/7) {
            powerup = 'fireimmunity';
         }else if(spawnChance <= 4/7) {
            powerup = 'lightningimmunity';
         }else if(spawnChance <= 5/7) {
            powerup = 'moonimmunity';
         }else if(spawnChance <= 6/7) {
            powerup = 'poisonimmunity';
         }else {
            powerup = 'waterimmunity';
         }
      }
        
      //new Powerups(peachGirl.scene, powerup, chest.x+20, chest.y+20);
      chest.pick = peachGirl.scene.add.sprite(chest.x+20, chest.y+30, powerup).setImmovable();
      // console.log(chest);
      peachGirl.scene.physics.world.enable(chest.pick);
   }
}