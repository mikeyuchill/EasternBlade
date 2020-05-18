class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set up loading bar (to-do)

        // load graphics assets
        //this.load.image('bun', './assets/img/bun.png');
        //this.load.atlas('bun', './assets/img/bun.png', './assets/img/bun.json');
        //this.load.atlas('people', './assets/img/bgspritesheet.png', './assets/img/bgspritesheet.json');
        //this.load.spritesheet('gooeyspritesheet', './assets/img/gooeyspritesheet.png', {frameWidth: 612, frameHeight: 186, startFrame: 0, endFrame: 2});
        // this.load.spritesheet('gooeyspritesheet', './assets/img/gooeyspritesheet.png', {frameWidth: 679, frameHeight: 184, startFrame: 0, endFrame: 2});
        // this.load.spritesheet('runnyspritesheet', './assets/img/runnyspritesheet.png', {frameWidth: 679, frameHeight: 184, startFrame: 0, endFrame: 2});
        this.load.image('oni', './assets/img/oni.png');
        this.load.image('boss', './assets/img/boss.png');
        this.load.image('peachGirl', './assets/img/peachGirl.png');
        this.load.image("tiles", './assets/img/dragonTiles.png');
        this.load.tilemapTiledJSON("level-1", './assets/img/DragonTiles.json');
        // this.load.image('yolkbar', './assets/img/yolkbar.png');
        // this.load.image('table', './assets/img/table.png');
        //this.load.image('ChopstickHand', './assets/img/ChopstickAnim.png');
        // this.load.spritesheet('ChopstickHand', './assets/img/ChopstickAnim.png', {frameWidth: 408, frameHeight: 299, startFrame: 0, endFrame: 1});
        // this.load.image('ForkHand', './assets/img/ForkHand.png');
        // this.load.image('chopsticks', './assets/img/chopsticks.png');
        // this.load.image('fork', './assets/img/fork.png');
        // this.load.image('plate', './assets/img/plate.png');
        // this.load.image('soysauce', './assets/img/soysauce.png');
        // this.load.image('teapot', './assets/img/teapot.png');
        // this.load.image('porkbunsteamer', './assets/img/porkbunsteamer.png');
        // this.load.image('shrimpdumplingsteamer', './assets/img/shrimpdumplingsteamer.png');
        // this.load.image('bgspritesheet', './assets/img/bgspritesheet.png');
        // this.load.spritesheet("coin", "coin.png", {
        //     frameWidth: 20,
        //     frameHeight: 20
        // });
        // this.load.image('normal', './assets/img/normal.png');
        // this.load.image('gooey', './assets/img/gooey.png');
        // this.load.image('runny', './assets/img/runny.png');
        // this.load.image('chili', './assets/img/chili.png');

        // this.load.image('menu', './assets/img/menu.png');
        // this.load.image('howtoplay', './assets/img/howtoplay.png');
        // this.load.image('howtoplay2', './assets/img/howtoplay2.png');
        // this.load.image('endgame', './assets/img/endgame.png');
        // this.load.image('newhighscore', './assets/img/newhighscore.png');
        // this.load.image('yousurvivedfor', './assets/img/yousurvivedfor.png');
        // this.load.image('thisbrowsersbest', './assets/img/thisbrowsersbest.png');

        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        

        // load audio assets
        this.load.audio('bgm', ['./assets/audio/bgm.mp3']);
        this.load.audio('click', ['./assets/audio/click.mp3']);
        
    }

    create() {
        
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('titleScene');
    }
    
}
