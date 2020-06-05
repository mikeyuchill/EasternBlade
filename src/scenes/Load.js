class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set up loading bar
        let loading = this.add.graphics();
        this.load.on('progress', (value)=> {
            loading.clear();                            // reset fill/line style
            loading.fillStyle(0xFACADE, 1);             // (color, alpha)
            loading.fillRect(100, 300, 700*value, 15);  // (x, y, width, height)
        });
        this.load.on('complete', ()=> {
            loading.destroy();
        });

        // load graphics assets
        //this.load.image('bun', './assets/img/bun.png');
        //this.load.atlas('bun', './assets/img/bun.png', './assets/img/bun.json');
        this.load.atlas('PeachGirl_attack', './assets/img/PeachGirl_attack.png', './assets/img/PeachGirl_attack.json');
        this.load.atlas('PeachGirl_walk', './assets/img/PeachGirl_walk.png', './assets/img/PeachGirl_walk.json');
        this.load.atlas('PeachGirl_idle', './assets/img/PeachGirl_idle.png', './assets/img/PeachGirl_idle.json');

        this.load.atlas('oxheaded_walk', './assets/img/oxheaded_walk.png', './assets/img/oxheaded_walk.json');
        this.load.atlas('oxheaded_attack', './assets/img/oxheaded_attack.png', './assets/img/oxheaded_attack.json');
        this.load.atlas('PeachGirl', './assets/img/PeachGirl_test.png', './assets/img/PeachGirl_test.json');
        //this.load.spritesheet('gooeyspritesheet', './assets/img/gooeyspritesheet.png', {frameWidth: 612, frameHeight: 186, startFrame: 0, endFrame: 2});
        // this.load.spritesheet('gooeyspritesheet', './assets/img/gooeyspritesheet.png', {frameWidth: 679, frameHeight: 184, startFrame: 0, endFrame: 2});
        // this.load.spritesheet('runnyspritesheet', './assets/img/runnyspritesheet.png', {frameWidth: 679, frameHeight: 184, startFrame: 0, endFrame: 2});
        this.load.image('oni', './assets/img/oni.png');
        this.load.image('boss', './assets/img/boss.png');
        //this.load.image('boss', './assets/img/boss.png');
        //this.load.spritesheet('peachGirl', './assets/img/peachGirl.png', {frameWidth: 80, frameHeight: 80, startFrame: 0});
        this.load.image("tiles", './assets/img/dragonTiles.png');
        this.load.tilemapTiledJSON("level-1", './assets/img/DragonTiles.json');
        this.load.image('firewheel', './assets/img/firewheel.png');
        this.load.image('oxheaded', './assets/img/oxheaded.png');
        this.load.image('horsefaced', './assets/img/horsefaced.png');
        this.load.image('monkkid', './assets/img/monkkid.png');
        this.load.image('heavenlydog', './assets/img/heavenlydog.png');
        this.load.spritesheet('chestPickups', './assets/img/chestPickups.png', {frameWidth: 64, frameHeight: 64, startFrame: 0});
        this.load.spritesheet('chestSpecial', './assets/img/chestSpecial.png', {frameWidth: 64, frameHeight: 64, startFrame: 0});

        this.load.image('extralife', './assets/img/extralife.png');
        this.load.image('extramove', './assets/img/extramove.png');
        this.load.image('peachsword', './assets/img/peachsword.png');
        this.load.image('peachshield', './assets/img/peachshield.png');
        this.load.image('peachmirror', './assets/img/peachmirror.png');
        this.load.image('airimmunity', './assets/img/airimmunity.png');
        this.load.image('earthimmunity', './assets/img/earthimmunity.png');
        this.load.image('fireimmunity', './assets/img/fireimmunity.png');
        this.load.image('lightningimmunity', './assets/img/lightningimmunity.png');
        this.load.image('moonimmunity', './assets/img/moonimmunity.png');
        this.load.image('poisonimmunity', './assets/img/poisonimmunity.png');
        this.load.image('waterimmunity', './assets/img/waterimmunity.png');

        this.load.image('waterdragon', './assets/img/waterdragon.png');
        this.load.image('poisondragon', './assets/img/poisondragon.png');
        
        // this.load.image('bgspritesheet', './assets/img/bgspritesheet.png');
        // this.load.spritesheet("coin", "coin.png", {
        //     frameWidth: 20,
        //     frameHeight: 20
        // });
        this.load.image('attack', './assets/img/attack.png');
        this.load.image('defense', './assets/img/defense.png');
        this.load.image('recovery', './assets/img/recovery.png');
        this.load.image('movebarcontainer', './assets/img/movebarcontainer.png');
        
        this.load.image('lvup', './assets/img/lvup.png');
        this.load.image('1exp', './assets/img/1exp.png');
        this.load.image('2exp', './assets/img/2exp.png');
        this.load.image('3exp', './assets/img/3exp.png');
        this.load.image('4exp', './assets/img/4exp.png');
        this.load.image('5exp', './assets/img/5exp.png');
        this.load.image('6exp', './assets/img/6exp.png');
        this.load.image('7exp', './assets/img/7exp.png');
        this.load.image('8exp', './assets/img/8exp.png');
        this.load.image('9exp', './assets/img/9exp.png');
        this.load.image('10exp', './assets/img/10exp.png');
        this.load.image('makeyourchoice', './assets/img/makeyourchoice.png');

        // load spritesheet
        this.load.spritesheet('health', './assets/img/health.png', {frameWidth: 39, frameHeight: 41, startFrame: 0});
        this.load.spritesheet('death', './assets/img/death.png', {frameWidth: 38, frameHeight: 39, startFrame: 0, endFrame: 3});
        this.load.spritesheet('pausebutton', './assets/img/pausebutton.png', {frameWidth: 100, frameHeight: 100, startFrame: 0});
        this.load.spritesheet('savebutton', './assets/img/savebutton.png', {frameWidth: 70, frameHeight: 50, startFrame: 0});
        this.load.spritesheet('sacrificebutton', './assets/img/sacrificebutton.png', {frameWidth: 70, frameHeight: 50, startFrame: 0});
        this.load.spritesheet('critattack', './assets/img/critattack.png', {frameWidth: 64, frameHeight: 64, startFrame: 0});
        this.load.image('criticalHitText', './assets/img/criticalHitText.png');
        // this.load.spritesheet('sacrificebutton', './assets/img/sacrificebutton.png', {frameWidth: 70, frameHeight: 50, startFrame: 0});


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
        // load bitmap font
        this.load.bitmapFont('gem_font', './assets/font/gem.png', './assets/font/gem.xml');
        

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
