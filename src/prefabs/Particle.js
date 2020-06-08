class Particle extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, velocity, xposition, ypostion, type) {
       //this.type = Phaser.Math.RND.pick(['normal', 'gooey', 'runny']);
       //console.log('expected object is:'+type);
       // call Phaser Physics Sprite constructor
       super(scene, xposition, ypostion, type); 

       
      //console.log('object is:'+type);

       //console.log('object is:'+Phaser.Physics.Arcade.Sprite.texture);
       // set up physics sprite
       scene.add.existing(this);               // add to existing scene, displayList, updateList
       scene.physics.add.existing(this);       // add physics body
       if(type == 'air_effect') {
         this.setVelocityX(1);
         scene.time.delayedCall(2000, () => {
            this.setVelocityX(velocity);
         }, null, this); 
       }else if(type == 'lightning'){
          if(yposition == 0) {
             this.angle = 180;
             this.setVelocityY(1);
             scene.time.delayedCall(2000, () => {
               this.setVelocityY(-velocity);
            }, null, this);
          }else {
             this.setVelocityY(-1);
            scene.time.delayedCall(2000, () => {
               this.setVelocityY(velocity);
            }, null, this);
          }
          
          
       }
         
       this.setImmovable();                    
       //this.tint = Math.random() * 0xFFFFFF;   // randomize tint
       this.newBarrier = true;                 // custom property to control barrier spawning

       this.type = type;
       this.scene = scene;
       this.velocity = velocity;
   }

   update() {
       // override physics sprite update()
       super.update();

      //  if(this.type == 'explosion') {
      //    console.log(peachGirl);
      //    console.log(fire_effect);
   
      
      // this.scene.physics.add.overlap(this, peachGirl, ()=>{console.log("here");}, null, this.scene);
   
      //  }
       // add new barrier when existing barrier hits center X
      //  if(this.newBarrier && this.x < centerX) {
      //      this.newBarrier = false;
      //      // call parent scene method from this context
      //      this.scene.suddenE(this.parent, this.velocity);
      //  }

       // destroy paddle if it reaches the left edge of the screen
       //if()
      //  if(this.x < -this.width) {
      //      this.destroy();
      //  }
       if(this.x > game.config.width) {
           this.destroy();
       }
   }
}