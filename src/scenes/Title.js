class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {
        this.anims.create({
            key: 'title',
            frames: this.anims.generateFrameNumbers('title', { start: 0, end: 2}),
            frameRate: 15,
            repeat: -1
         });
        this.anims.create({
            key: 'loading_peach',
            frames: this.anims.generateFrameNumbers('loading_peach', { start: 0, end: 5}),
            frameRate: 10,
            repeat: -1
        });
        this.menu = this.add.image(centerX, centerY, 'mainmenu').setScale(1).setOrigin(0.5,0.5);
        this.title = this.add.sprite(centerX, centerY-200, 'title').setScale(1).setOrigin(0.5,0.5);
        this.title.anims.play('title', true);

        this.playbutton = new Button(this, 'playbutton', centerX, centerY+3*textSpacer-50).setOrigin(0.5).setScale(2.5);
        this.creditsbutton = new Button(this, 'creditsbutton', centerX, centerY+6*textSpacer).setOrigin(0.5).setScale(2.5);

        this.loading_peach = this.add.sprite(centerX+6*textSpacer, centerY+6*textSpacer, 'loading_peach').setOrigin(0.5, 0.5).setScale(3);
        this.loading_peach.anims.play('loading_peach', true);
        // add title screen text
        // this.add.text(centerX, centerY, 'EasternBlade', { fontFamily: 'Helvetica', fontSize: '48px', color: '#6C1010' }).setOrigin(0.5);
        // this.add.text(centerX, centerY + textSpacer, 'Use ARROW KEYS to move around and attack', { fontFamily: 'Helvetica', fontSize: '24px', color: '#6C1010' }).setOrigin(0.5);
        // this.add.text(centerX, centerY + textSpacer*2, 'Press UP ARROW to Start', { fontFamily: 'Helvetica', fontSize: '24px', color: '#6C1010' }).setOrigin(0.5);

        this.input.on('gameobjectdown', (pointer, gameObject, event) => {
            // scene.sound.play('Selection', {volume:0.25});
            if(gameObject===this.playbutton){
               this.scene.start('playScene');
               
   
            }else { // credit
               this.scene.start('creditScene')
            }
         });

        // this.tweens.add({
        //        targets: this.menu,
        //        alpha: 0.6,
        //        ease: 'Back.easeOut',  
        //        duration: 1000,
        //        repeat: -1,
        //        yoyo: true
        // });
    }

    update() {
        // check for UP input
        // if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
        //     this.sound.play('click', { volume: 0.5});
        //     this.scene.start('playScene');
        // }
        // else if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
        //     this.sound.play('Bling', { volume: 0.5});
        //     this.scene.start('instruction');

        // }

    }
}