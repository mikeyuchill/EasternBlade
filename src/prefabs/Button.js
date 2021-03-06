class Button extends Phaser.GameObjects.Sprite {
   constructor(scene, type, xposition, ypostion) {
      super(scene, xposition, ypostion, type);

      this.scene = scene;
      this.pause = null;
      this.setInteractive({
         useHandCursor: true
      });

      this.setDepth(3);

      this.scene.input.on('gameobjectover', (pointer, gameObject, event) => {
         gameObject.setFrame(1);
      });

      this.scene.input.on('gameobjectout', (pointer, gameObject, event) => {
         gameObject.setFrame(0);
      });

      
      

      //this.choice = this.scene.add.bitmapText(centerX, centerY - 32, 'gem_font', 'PAUSE', 32).setOrigin(0.5);
      
      //this.taggleChoice(false);

      
      scene.add.existing(this);
   }

   togglePause(isVisible) {
      this.pause.setVisible(isVisible);

   }
}