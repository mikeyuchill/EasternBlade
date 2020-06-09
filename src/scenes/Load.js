class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set up loading bar
        let loading = this.add.graphics({ x:250, y:centerY });
        let border = this.add.graphics({ x:250, y:centerY });
        
        this.load.on('progress', (value)=> {
            loading.clear();                            // reset fill/line style
            loading.fillStyle(0xFACADE, 1);             // (color, alpha)
            loading.fillRect(0, 0, 700*value, 50);  // (x, y, width, height)

            border.clear();
            border.lineStyle(10, 0xFFFFFF, 1);
            border.strokeRect(0, 0, 700*value, 50);
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
        this.load.spritesheet('PeachGirl_death', './assets/img/PeachGirl_death.png', {frameWidth: 80, frameHeight: 80, startFrame: 0});
        this.load.spritesheet('PeachGirl_stun', './assets/img/PeachGirl_stun.png', {frameWidth: 80, frameHeight: 80, startFrame: 0});
        this.load.spritesheet('firewheel_walk', './assets/img/firewheel_walk.png', {frameWidth: 60, frameHeight: 60, startFrame: 0});
        this.load.atlas('oxheaded_walk', './assets/img/oxheaded_walk.png', './assets/img/oxheaded_walk.json');
        this.load.atlas('oxheaded_attack', './assets/img/oxheaded_attack.png', './assets/img/oxheaded_attack.json');
        this.load.spritesheet('horsefaced_walk', './assets/img/horsefaced_walk.png', {frameWidth: 60, frameHeight: 60, startFrame: 0});
        this.load.spritesheet('horsefaced_attack', './assets/img/horsefaced_attack.png', {frameWidth: 60, frameHeight: 60, startFrame: 0});
        this.load.spritesheet('monkkid_walk', './assets/img/monkkid_walk.png', {frameWidth: 60, frameHeight: 60, startFrame: 0});
        this.load.spritesheet('monkkid_attack', './assets/img/monkkid_attack.png', {frameWidth: 150, frameHeight: 60, startFrame: 0});
        this.load.image('tongue', './assets/img/tongue.png');
        this.load.spritesheet('heavenlydog_walk', './assets/img/heavenlydog_walk.png', {frameWidth: 80, frameHeight: 80, startFrame: 0});
        this.load.spritesheet('heavenlydog_attack', './assets/img/heavenlydog_attack.png', {frameWidth: 80, frameHeight: 80, startFrame: 0});
        this.load.spritesheet('heavenlydog_summon', './assets/img/heavenlydog_summon.png', {frameWidth: 80, frameHeight: 80, startFrame: 0});
        this.load.spritesheet('heavenlydog_tornado', './assets/img/heavenlydog_tornado.png', {frameWidth: 41, frameHeight: 56, startFrame: 0});
        this.load.spritesheet('kappa_walk', './assets/img/kappa_walk.png', {frameWidth: 60, frameHeight: 60, startFrame: 0});
        this.load.spritesheet('kappa_attack', './assets/img/kappa_attack.png', {frameWidth: 60, frameHeight: 60, startFrame: 0});
        this.load.spritesheet('kappa_fart', './assets/img/kappa_fart.png', {frameWidth: 39, frameHeight: 39, startFrame: 0});
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
        this.load.image('kappa', './assets/img/kappa.png');
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

        this.load.image('airdragon', './assets/img/airdragon.png');
        this.load.image('earthdragon', './assets/img/earthdragon.png');
        this.load.image('firedragon', './assets/img/firedragon.png');
        this.load.image('lightningdragon', './assets/img/lightningdragon.png');
        this.load.image('moondragon', './assets/img/moondragon.png');
        this.load.image('waterdragon', './assets/img/waterdragon.png');
        this.load.image('poisondragon', './assets/img/poisondragon.png');
        this.load.spritesheet('weakscale', './assets/img/weakscale.png', {frameWidth: 64, frameHeight: 64, startFrame: 0});
        
        // this.load.image('bgspritesheet', './assets/img/bgspritesheet.png');
        // this.load.spritesheet("coin", "coin.png", {
        //     frameWidth: 20,
        //     frameHeight: 20
        // });
        this.load.image('attack', './assets/img/attack.png');
        this.load.image('defense', './assets/img/defense.png');
        this.load.image('recovery', './assets/img/recovery.png');
        this.load.image('movebarcontainer', './assets/img/movebarcontainer.png');
        this.load.image('sky', './assets/img/sky.png');
        this.load.image('wall', './assets/img/wall.png');
        
        this.load.image('poison', './assets/img/poison.png');
        this.load.image('slow', './assets/img/slow.png');
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
        this.load.spritesheet('loading_peach', './assets/img/loading_peach.png', {frameWidth: 60, frameHeight: 60, startFrame: 0});
        this.load.spritesheet('health', './assets/img/health.png', {frameWidth: 39, frameHeight: 41, startFrame: 0});
        this.load.spritesheet('death', './assets/img/death.png', {frameWidth: 38, frameHeight: 39, startFrame: 0, endFrame: 3});
        this.load.spritesheet('playbutton', './assets/img/playbutton.png', {frameWidth: 100, frameHeight: 100, startFrame: 0});
        this.load.spritesheet('creditsbutton', './assets/img/creditsbutton.png', {frameWidth: 90, frameHeight: 50, startFrame: 0});

        this.load.spritesheet('pausebutton', './assets/img/pausebutton.png', {frameWidth: 100, frameHeight: 100, startFrame: 0});
        this.load.spritesheet('savebutton', './assets/img/savebutton.png', {frameWidth: 70, frameHeight: 50, startFrame: 0});
        this.load.spritesheet('sacrificebutton', './assets/img/sacrificebutton.png', {frameWidth: 70, frameHeight: 50, startFrame: 0});
        this.load.spritesheet('restartbutton', './assets/img/restartbutton.png', {frameWidth: 90, frameHeight: 50, startFrame: 0});
        this.load.spritesheet('mainmenubutton', './assets/img/mainmenubutton.png', {frameWidth: 90, frameHeight: 50, startFrame: 0});
        this.load.spritesheet('critattack', './assets/img/critattack.png', {frameWidth: 64, frameHeight: 64, startFrame: 0});
        this.load.image('criticalHitText', './assets/img/criticalHitText.png');
        this.load.spritesheet('flawlessdefense', './assets/img/flawlessdefense.png', {frameWidth: 64, frameHeight: 64, startFrame: 0});
        this.load.image('flawlessDefenseText', './assets/img/flawlessDefenseText.png');
        this.load.image('mainmenu', './assets/img/mainmenu.png');
        this.load.image('creditspage', './assets/img/creditspage.png');
        this.load.spritesheet('title', './assets/img/title.png', {frameWidth: 787, frameHeight: 360, startFrame: 0});
        this.load.spritesheet('gameover', './assets/img/gameover.png', {frameWidth: 720, frameHeight: 365, startFrame: 0});
        this.load.spritesheet('missioncomplete', './assets/img/missioncomplete.png', {frameWidth: 900, frameHeight: 400, startFrame: 0});
        this.load.spritesheet('pausemenu', './assets/img/pausemenu.png', {frameWidth: 800, frameHeight: 200, startFrame: 0});
        // this.load.spritesheet('sacrificebutton', './assets/img/sacrificebutton.png', {frameWidth: 70, frameHeight: 50, startFrame: 0});


        this.load.spritesheet('air_effect', './assets/img/air_effect.png', {frameWidth: 64, frameHeight: 256, startFrame: 0});
        this.load.spritesheet('explosion', './assets/img/explosion.png', {frameWidth: 192, frameHeight: 192, startFrame: 0});
        this.load.spritesheet('lightning', './assets/img/lightning.png', {frameWidth: 64, frameHeight: 320, startFrame: 0});
        this.load.spritesheet('moonbeamHorizontal', './assets/img/moonbeamHorizontal.png', {frameWidth: 960, frameHeight: 128, startFrame: 0});
        this.load.spritesheet('moonbeamVertical', './assets/img/moonbeamVertical.png', {frameWidth: 128, frameHeight: 1920, startFrame: 0});
        
        

        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        // load bitmap font
        this.load.bitmapFont('gem_font', './assets/font/gem.png', './assets/font/gem.xml');

        this.load.json('dialog', './assets/img/dialog.json');
        

        // load audio assets
        this.load.audio('menubgm', ['./assets/audio/menubgm.mp3']);
        this.load.audio('bgm', ['./assets/audio/bgm.mp3']);
        this.load.audio('boosbgm', ['./assets/audio/boosbgm.mp3']);
        this.load.audio('click', ['./assets/audio/click.wav']);
        this.load.audio('playerattack', ['./assets/audio/playerattack.wav']);
        this.load.audio('chest_open', ['./assets/audio/chest_open.mp3']);
        this.load.audio('chest_close', ['./assets/audio/chest_close.mp3']);
        this.load.audio('hit', ['./assets/audio/Hit.m4a']);
        this.load.audio('level_up', ['./assets/audio/level_up.mp3']);
        this.load.audio('pickup', ['./assets/audio/pickup.mp3']);
        this.load.audio('fire_explosion', ['./assets/audio/fire_explosion.mp3']);
        this.load.audio('wind', ['./assets/audio/wind.mp3']);
        this.load.audio('lightning_strike', ['./assets/audio/lightning_strike.wav']);
        this.load.audio('moon_beam', ['./assets/audio/moon_beam.wav']);
        this.load.audio('oxheaded_attack', ['./assets/audio/oxheaded_attack.mp3']);
        this.load.audio('horsefaced_attack', ['./assets/audio/horsefaced_attack.mp3']);
        this.load.audio('monkkid_attack', ['./assets/audio/monkkid_attack.wav']);
        this.load.audio('heacenlydog_attack', ['./assets/audio/heacenlydog_attack.flac']);
        this.load.audio('kappa_attack', ['./assets/audio/kappa_attack.wav']);
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
