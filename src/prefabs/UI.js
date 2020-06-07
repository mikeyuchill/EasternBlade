class UI extends Phaser.Scene {
   
   constructor() {
      super({ key: 'gameUI' });
   }
   create() {
         //this.add.image(6, 26, 'treasure', 'coin_anim_f0.png')
         // const coinsLabel = this.add.text(12, 20, '0', {
         //    fontSize: '14'
         // })
      this.sceneA = this.scene.get('playScene');
      this.sceneC = this.scene.get('Instruction');
      this.anims.create({
         key: 'gameover',
         frames: this.anims.generateFrameNumbers('gameover', { start: 0, end: 2}),
         frameRate: 15,
         repeat: -1
      });
         
      // the move Bar container.
      let movebarcontainer = this.add.sprite(210, 100, "movebarcontainer").setScale(0.8);
      movebarcontainer.setDepth(1);
      moveBar = new Movebar(this, 18, 42);
      // the actual move Bar.
      // this.movebar = this.add.sprite(movebarcontainer.x, movebarcontainer.y, "movebar").setScale(0.8);
      // //this.yolkBar = this.add.sprite(220, 40, "yolkbar").setScale(0.5);
      
      // // a copy of the Yolk bar to be used as a mask.
      // this.moveMask = this.add.sprite(this.movebar.x, this.movebar.y, "movebar").setScale(0.8);
      // this.moveMask.visible = false;
      // this.movebar.mask = new Phaser.Display.Masks.BitmapMask(this, this.moveMask);
      // let stepWidth = this.moveMask.displayWidth / 300;
      // // moving the mask
      // this.moveMask.x -= stepWidth;
      //this.ATK = this.add.text(650, 85, `ATK: ${peachGirl.attack}`, { fontFamily: 'Freckle Face', fontSize: '36px', color: '#F00' });
      this.add.sprite(600+2*textSpacer, 40, "attack");
      this.ATK = this.add.bitmapText(655+2*textSpacer, 40, 'gem_font', `${peachGirl.attack}%`, 32).setOrigin(0.5);
      this.ATK.tintFill = true;
      this.ATK.setTintFill(0xFF0000);
      //console.log(this.ATK.tintFill);
      //this.ATK.setTint(0x6C1010, 0x6C1010, 0x6C1010, 0x6C1010);
      
      
      this.add.sprite(600+4*textSpacer, 40, "defense");
      this.DFS = this.add.bitmapText(655+4*textSpacer, 40, 'gem_font', `${peachGirl.defense}%`, 32).setOrigin(0.5);
      this.DFS.tintFill = true;
      this.DFS.setTintFill(0x00BFFF);

      this.add.sprite(600+6*textSpacer, 40, "recovery");
      this.REC = this.add.bitmapText(655+6*textSpacer, 40, 'gem_font', `${peachGirl.recovery}`, 32).setOrigin(0.5);
      this.REC.tintFill = true;
      this.REC.setTintFill(0x00FF00);


      this.pausebutton = new Button(this, 'pausebutton', 620+8*textSpacer, 60).setOrigin(0.5);
      this.savebutton = new Button(this, 'savebutton', centerX-textSpacer, centerY+textSpacer).setOrigin(0.5).setVisible(false);
      this.sacrificebutton = new Button(this, 'sacrificebutton', centerX+textSpacer, centerY+textSpacer).setOrigin(0.5).setVisible(false);
      this.gameover = this.add.sprite(centerX, centerY - 128, 'gameover').setOrigin(0.5, 0.5).setScale(0.5).setVisible(isgameover);
         this.gameover.anims.play('gameover', true);
         this.restartbutton = new Button(this, 'restartbutton', centerX, centerY+textSpacer).setOrigin(0.5).setVisible(isgameover);
         this.mainmenubutton = new Button(this, 'mainmenubutton', centerX, centerY+3*textSpacer).setOrigin(0.5).setVisible(isgameover);
      // sceneEvents.on('player-coins-changed', (coins: number) => {
      //    coinsLabel.text = coins.toLocaleString()
      // })
      // this.add.image(centerX+20, centerY+2*textSpacer, 'ui_heart_full')

      this.makechoice = this.add.sprite(centerX, centerY-textSpacer, "makeyourchoice");
      this.makechoice.setVisible(ischoice);

      this.hearts = this.add.group({
         runChildUpdate: true,   // make sure update runs on group children
         classType: Phaser.GameObjects.Image
      })
      console.log(this.hearts);
      //this.hearts.crea
      this.textLv = this.add.bitmapText(250, 40, 'gem_font', `LV: ${peachGirl.lv}`, 32).setOrigin(0.5);
      this.textExp = this.add.bitmapText(350, 40, 'gem_font', `EXP: ${peachGirl.exp}`, 32).setOrigin(0.5);
      
      this.hearts.createMultiple({
         key: 'health',
         setXY: {
            x: 40,
            y: 40,
            stepX: 60
         },
         quantity: 3

      })

      this.input.on('gameobjectdown', (pointer, gameObject, event) => {
         // scene.sound.play('Selection', {volume:0.25});
         if(gameObject===this.savebutton){
            //if(!(game.scene.isPaused('playScene') && ischoice)) return;
            ischoice = false;
            console.log("once");
            peachGirl.defense += peachGirl.lv;
            console.log(peachGirl.defense);
            this.makechoice.setVisible(ischoice);
            game.scene.resume('playScene');
            

         }else if(gameObject===this.sacrificebutton){
            ischoice = false;
            console.log("once");
            peachGirl.attack += peachGirl.lv;
            this.makechoice.setVisible(ischoice);
            game.scene.resume('playScene');
         }else if(gameObject===this.pausebutton){
            //this.scene.start("InstructionScene");
            //if(ispause) return;
            if(isgameover) return;
            ispause = !ispause;
            //this.togglePause(ispause);
            console.log(this.pause);
            gameObject.pause.setVisible(ispause);
            
            if(ispause) {
               game.scene.pause('playScene');
               
            }else{
               game.scene.resume('playScene');
            }

         }else if(gameObject===this.restartbutton) {
            this.sceneA.scene.restart();
            // this.sceneC.scene.restart();
            // this.sceneC.scene.stop('Instruction');
            isgameover = false;
         }else if(gameObject===this.mainmenubutton) {
            this.sceneA.scene.start("titleScene");
            this.scene.stop('Instruction');
            this.scene.stop('gameUI');
            isgameover = false;
         }else { // resume
            game.scene.resume('playScene');
         }
      });
      //console.log(this.hearts);
      //console.log("UI: "+this);
      //this.handlePlayerHealthChanged(3);
      //sceneEvents.on('player-health-changed', this.handlePlayerHealthChanged, this)

      // this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      //    sceneEvents.off('player-health-changed', this.handlePlayerHealthChanged, this)
      //    sceneEvents.off('player-coins-changed')
      // })
   }

   update() {
      if(peachGirl.life <= 0 || moveBar.value <= 0){
         isgameover = true;
         game.scene.pause('playScene');
         this.gameover.setVisible(isgameover);
         this.restartbutton.setVisible(isgameover);
         this.mainmenubutton.setVisible(isgameover);
         //create tween to fade out audio
         this.tweens.add({
          targets: bgm,
          volume: 0,
          ease: 'Linear',
          duration: 2000,
          });
         //  this.scene.scene.start('gameOverScene');
         
     }
      if(game.scene.isPaused('playScene') && ischoice) {
         this.savebutton.setVisible(true);
         this.sacrificebutton.setVisible(true);
         this.makechoice.setVisible(ischoice);
      }else {
         this.savebutton.setVisible(false);
         this.sacrificebutton.setVisible(false);
      }
      this.handlePlayerHealthChanged(peachGirl.life);
      this.textLv.text = `LV: ${peachGirl.lv}`;
      this.textExp.text = `EXP: ${peachGirl.exp}`;
      this.ATK.text = `${peachGirl.attack}%`;
       this.DFS.text = `${peachGirl.defense}%`;
       this.REC.text = `${peachGirl.recovery}`;


       if(keys.X.isDown) {
         moveBar.decrease(peachGirl.consumption*2);
     }
       
       if(keys.UP.isDown) {
         moveBar.decrease(peachGirl.consumption);
     } else if(keys.DOWN.isDown) {
         moveBar.decrease(peachGirl.consumption);
     }
     
     if(keys.LEFT.isDown) {
         moveBar.decrease(peachGirl.consumption);
     } else if(keys.RIGHT.isDown) {
         moveBar.decrease(peachGirl.consumption);
     } 
   }

   handlePlayerHealthChanged(health)
	{
		this.hearts.children.each((go, idx) => {
         //const heart = go as Phaser.GameObjects.Image
         //idx = 11;
         //health = 11;
         //console.log(idx+", "+health)
         if(health >= 8 && health <= 12) {
            
            if(idx == 2) {
               switch (health) {
                  case 12:
                     go.setFrame(0);
                     break;
                  case 11:
                     go.setFrame(1);
                     break;
                  case 10:
                     go.setFrame(2);
                     break;
                  case 9:
                     go.setFrame(3);
                     break;
                  default:
                     go.setFrame(4);
                     break;
               }
            }
            if(idx == 1) {
               go.setFrame(0);
            }
            if(idx == 0) {
               go.setFrame(0);
            }
         }
         if(health >= 4 && health <= 8) {
            if(idx == 1) {
               switch (health) {
                  case 8:
                     go.setFrame(0);
                     break;
                  case 7:
                     go.setFrame(1);
                     break;
                  case 6:
                     go.setFrame(2);
                     break;
                  case 5:
                     go.setFrame(3);
                     break;
                  default:
                     go.setFrame(4);
                     break;
               }
            }
            if(idx == 0) {
               go.setFrame(0);
            }
         }
         if(health >= 0 && health <= 4) {
            if(idx == 0) {
               switch (health) {
                  case 4:
                     go.setFrame(0);
                     break;
                  case 3:
                     go.setFrame(1);
                     break;
                  case 2:
                     go.setFrame(2);
                     break;
                  case 1:
                     go.setFrame(3);
                     break;
                  default:
                     go.setFrame(4);
                     break;
               }
            }
         }
			// if (idx < health)
			// {
         //    go.setFrame(0)
            
			// }
			// else
			// {
			// 	go.setFrame(4)
			// }
		})
   }
   
   createPauseScreen() {
      this.veil = this.add.graphics({ x: 0, y: 0 });
      this.veil.fillStyle('0x000000', 0.3);
      this.veil.setDepth(3);

   }
   
}