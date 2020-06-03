class Boss extends Phaser.Scene {
   
   constructor() {
      super({ key: 'Boss' });
   }
   
   create() {
      //if(peachGirl.currentRoom == 5) {
         this.bossGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        this.waterdragon = this.add.sprite(80, 200, 'waterdragon').setOrigin(0.5, 0.5).setScale(3).setAngle(-45);
        

this.cameras.main.startFollow(peachGirl);
      //}
   }

   update() {
      console.log(this.cameras.main.worldView.contains(this.waterdragon.x, this.waterdragon.y));
   }
}