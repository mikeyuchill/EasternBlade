class Credit extends Phaser.Scene {
   constructor() {
       super('creditScene');
   }

   create() {
       this.creditspage = this.add.image(centerX, centerY, 'creditspage').setScale(1).setOrigin(0.5,0.5);
       this.mainmenubutton = new Button(this, 'mainmenubutton', centerX, centerY+6*textSpacer+30).setOrigin(0.5).setScale(2);
       // add title screen text
       // this.add.text(centerX, centerY, 'Dim Sum Run', { fontFamily: 'Helvetica', fontSize: '48px', color: '#F9BB1F' }).setOrigin(0.5);
       // this.add.text(centerX, centerY + textSpacer, 'Use the UP + DOWN ARROWS to dodge color paddles and avoid getting REKT', { fontFamily: 'Helvetica', fontSize: '24px', color: '#FFF' }).setOrigin(0.5);
       // this.add.text(centerX, centerY + textSpacer*2, 'Press UP ARROW to Start', { fontFamily: 'Helvetica', fontSize: '24px', color: '#FFF' }).setOrigin(0.5);

       this.input.on('gameobjectdown', (pointer, gameObject, event) => {
         // scene.sound.play('Selection', {volume:0.25});
         if(gameObject===this.mainmenubutton){
            this.scene.start('titleScene');
            // this.sound.play('Bling', { volume: 0.5});

         }
      });
   }

   update() {
       // check for UP input

   }
}