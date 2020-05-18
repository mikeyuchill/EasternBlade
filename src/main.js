// Programmer: Sheng Yu
// Artists: Sunny Jang, Victor Dong
// EasternBlade
// An indie action game
// Created: 05/07/20
// Updated: 05/16/20
// Creaative justification:
// Cite: 

// keep me honest
'use strict';

// define and configure main Phaser game object
let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    width: 960,
    height: 1200,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    //scene: [ Load, Title, Instruction, Play, GameOver ],
    scene: [ Load, Title, Play, GameOver ],
    "transparent": true
}

// uncomment the following line if you need to purge local storage data
//localStorage.clear();

// define game
let game = new Phaser.Game(config);

// define globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
const textSpacer = 64;
let peachGirl = null;
let paddle = null;
let sudden = null;
let suddentype = null;
const paddleWidth = 16;
const paddleHeight = 128;
const paddleVelocity = 200;
let floorLayer = null;
let scaleLayer = null;
let aboveLayer = null;
let bgm = null;
let powerups;
let level;
let highScore;
let newHighScore = false;
let cursors;
let keys;

let gameOptions = {
    gravity: 1,
    maxItemsPerLevel: 30,
    maxIterations: 10,
    minItemsDistance: 160
}

var enemyData ={
    "oni":{
        "width"		: 12,
        "height"	: 12,
        "health"    : 1,
        "lv"		: 1,
        "exp"		: 1,
        "interval"	: 200,
        "move"		:[
                        [10, 0],
                        [0, 0],
                        [-10, 0],
                        [-10, 0],
                        [0, 0],
                        [10, 0]
                    ]
    },
    "boss":{
        "width"		: 12,
        "height"	: 12,
        "health"    : 3,
        "lv"		: 2,
        "exp"		: 10,
        "interval"	: 1000,
        "move"		:[
                        [-35, 0],
                        [35, 0],
                        [35, 0],
                        [-35, 0]
                    ]
    },
    "firewheel":{
        "width"		: 14,
        "height"	: 14,
        "lv"		: 3,
        "exp"		: 3,
        "interval"	: 20,
        "move"		:[
                        [-20, 0],
                        [20, -10],
                        [20, 10],
                        [-20, 0],
                        [0, 0]
                    ]
    },
    "ox-headed":{
        "width"		: 14,
        "height"	: 14,
        "lv"		: 6,
        "exp"		: 4,
        "interval"	: 10,
        "move"		:[
                        [10, 0],
                        [0, 0],
                        [10, 0],
                        [0, 0],
                        [-10, 0],
                        [0, 0],
                        [-10, 0],
                        [0, 0],
                        [-10, 0],
                        [0, 0],
                        [-10, 0],
                        [0, 0],
                        [10, 0],
                        [0, 0],
                        [10, 0]
                    ]
    },
    "horse-faced":{
        "width"		: 16,
        "height"	: 16,
        "lv"		: 7,
        "exp"		: 5,
        "interval"	: 80,
        "move"		:[
                        [20, 0],
                        [-20, 0],
                        [-20, 0],
                        [20, 0]
                    ]
    },
    "Monk kid":{
        "width"		: 16,
        "height"	: 16,
        "lv"		: 8,
        "exp"		: 6,
        "interval"	: 40,
        "move"		:[
                        [10, 0],
                        [-10, 0],
                        [-10, 0],
                        [10, 0]
                    ]
    },
    "Heavenly Dog":{
        "width"		: 20,
        "height"	: 20,
        "lv"		: 9,
        "exp"		: 7,
        "interval"	: 40,
        "move"		:[
                        [15, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [-15, 0],
                        [-15, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [15, 0]
                    ]
    },
    "Kappa":{
        "width"		: 32,
        "height"	: 24,
        "lv"		: 10,
        "exp"		: 10,
        "interval"	: 240,
        "move"		:[
                        [30, 0],
                        [-30, 0]
                    ]
    }
};