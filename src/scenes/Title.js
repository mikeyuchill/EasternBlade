class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {
        //this.add.image(centerX, centerY, 'menu').setScale(0.19).setOrigin(0.5,0.5);
        // add title screen text
        this.add.text(centerX, centerY, 'EasternBlade', { fontFamily: 'Helvetica', fontSize: '48px', color: '#6C1010' }).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer, 'Use ARROW KEYS to move around and attack', { fontFamily: 'Helvetica', fontSize: '24px', color: '#6C1010' }).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer*2, 'Press UP ARROW to Start', { fontFamily: 'Helvetica', fontSize: '24px', color: '#6C1010' }).setOrigin(0.5);

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.sound.play('click', { volume: 0.5});
            this.scene.start('playScene');
        }
        // else if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
        //     this.sound.play('Bling', { volume: 0.5});
        //     this.scene.start('instruction');

        // }

    }
}