// Programmer: Sheng Yu
// Artists: Sunny Jang, Victor Dong
// EasternBlade
// An indie action game
// Created: 05/07/20
// Updated: 05/20/20
// Creaative justification:
// Cite: 

// keep me honest
'use strict';

// define and configure main Phaser game object
let config = {
    parent: 'myGame',
    //type: Phaser.CANVAS,
    type: Phaser.WEBGL,
    // render: {
    //     pixelArt: true
    // },
    pixelArt: true,
    width: 1200,
    height: 960,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    // fps: {
    //     target: 60,
    //     forceSetTimeOut: true
    // },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    //scene: [ Load, Title, Instruction, Play, GameOver ],
    scene: [ Load, Title, Play, UI, Boss, GameOver ],
    //"transparent": true
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
let isgameover = false;
let ispause = false;
let ischoice = false;
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
var nextLevelList = [
    0,
    2,
    4,
    7,
    10,
    14,
    20,
    26,
    32,
    38,
    46,
    52,
    58,
    66,
    72,
    80,
    90,
    100,
    110,
    120,
    130,
    140,
    150,
    999
 ];
var enemyData ={
    "oni":{
        "width"		: 12,
        "height"	: 12,
        "health"    : 1,
        "lv"		: 1,
        "exp"		: 1,
        "range"	    : 200,
        "interval"  : 1000, 
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
        "range"	    : 1000,
        "interval"  : 1000, 
        "move"		:[
                        [-15, 0],
                        [15, 0],
                        [15, 0],
                        [-15, 0]
                    ]
    },
    "firewheel":{
        "width"		: 14,
        "height"	: 14,
        "health"    : 3,
        "lv"		: 1,
        "exp"		: 3,
        "range"	: 20,
        "interval"  : 1000, 
        "move"		:[
                        [-100, 0],
                        [100, 0],
                        [0, 100],
                        [0, -100],
                        [0, 0],
                        [-50, 0],
                        [50, 0],
                        [0, 50],
                        [0, -50]
                    ]
    },
    "oxheaded":{
        "width"		: 14,
        "height"	: 14,
        "health"    : 6,
        "lv"		: 6,
        "exp"		: 4,
        "range"	: 50,
        "interval"  : 500,
        "move"		:[
                        [-100, 0],
                        [100, 0],
                        [0, 100],
                        [0, -100],
                        [0, 0],
                        [-50, 0],
                        [50, 0],
                        [0, 50],
                        [0, -50]
                    ]
    },
    "horsefaced":{
        "width"		: 16,
        "height"	: 16,
        "lv"		: 7,
        "exp"		: 4,
        "range"	: 80,
        "interval"  : 1000,
        "move"		:[
                        [200, 0],
                        [-200, 0],
                        [-200, 0],
                        [200, 0]
                    ]
    },
    "monkkid":{
        "width"		: 16,
        "height"	: 16,
        "lv"		: 8,
        "exp"		: 6,
        "range"	: 40,
        "interval"  : 1000,
        "move"		:[
                        [10, 0],
                        [-10, 0],
                        [-10, 0],
                        [10, 0]
                    ]
    },
    "heavenlydog":{
        "width"		: 20,
        "height"	: 20,
        "lv"		: 9,
        "exp"		: 7,
        "range"	: 40,
        "interval"  : 1000,
        "move"		:[
                        [150, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [-150, 0],
                        [-150, 0],
                        [0, 0],
                        [0, 0],
                        [0, 0],
                        [150, 0]


                        [-200, 0],
                        [200, -100],
                        [200, 100],
                        [-200, 0],
                        [0, 0]
                    ]
    },
    "kappa":{
        "width"		: 32,
        "height"	: 24,
        "lv"		: 10,
        "exp"		: 10,
        "range"	: 240,
        "interval"  : 1000,
        "move"		:[
                        [30, 0],
                        [-30, 0]
                    ]
    }
};