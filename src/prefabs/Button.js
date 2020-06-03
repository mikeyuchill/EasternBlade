class Button extends Phaser.GameObjects.Sprite {
   constructor(scene, type, xposition, ypostion) {
      super(scene, xposition, ypostion, type);

      this.scene = scene;
      this.setInteractive({
         useHandCursor: true
      });

      this.scene.input.on('gameobjectover', (pointer, gameObject, event) => {
         gameObject.setFrame(1);
      });

      this.scene.input.on('gameobjectout', (pointer, gameObject, event) => {
         gameObject.setFrame(0);
      });

      if(type === 'pausebutton') {
         this.pause = this.scene.add.bitmapText(centerX, centerY - 32, 'gem_font', 'PAUSE', 32).setOrigin(0.5); 
         this.togglePause(false);
      }
      // else if(type === 'savebutton') {

      // }
      

      //this.choice = this.scene.add.bitmapText(centerX, centerY - 32, 'gem_font', 'PAUSE', 32).setOrigin(0.5);
      
      //this.taggleChoice(false);

      this.scene.input.on('gameobjectdown', (pointer, gameObject, event) => {
         // scene.sound.play('Selection', {volume:0.25});
         if(gameObject===this.scene.savebutton){
            if(!(game.scene.isPaused('playScene') && ischoice)) return;
            ischoice = false;
            console.log("once");
            peachGirl.defense += peachGirl.lv;
            console.log(peachGirl.defense);
            game.scene.resume('playScene');
            

         }else if(gameObject===this.scene.pausebutton){
            //this.scene.start("InstructionScene");
            if(isgameover) return;
            ispause = !ispause;
            this.togglePause(ispause);
            if(ispause) {
               game.scene.pause('playScene');
            }else{
               game.scene.resume('playScene');
            }

         }
         // else{
         //     this.scene.start("CreditsScene"); 
         // }
      });
      scene.add.existing(this);
   }

   togglePause(isVisible) {
      this.pause.setVisible(isVisible);

   }
}