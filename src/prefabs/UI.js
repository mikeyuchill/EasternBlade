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
      this.anims.create({
         key: 'pausemenu',
         frames: this.anims.generateFrameNumbers('pausemenu', { start: 0, end: 2}),
         frameRate: 15,
         repeat: -1
      });
      this.anims.create({
         key: 'missioncomplete',
         frames: this.anims.generateFrameNumbers('missioncomplete', { start: 0, end: 2}),
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
      this.add.sprite(570+2*textSpacer, 40, "attack");
      this.ATK = this.add.bitmapText(635+2*textSpacer, 40, 'gem_font', `${peachGirl.attack}%`, 32).setOrigin(0.5);
      this.ATK.tintFill = true;
      this.ATK.setTintFill(0xFF0000);
      //console.log(this.ATK.tintFill);
      //this.ATK.setTint(0x6C1010, 0x6C1010, 0x6C1010, 0x6C1010);
      
      
      this.add.sprite(580+4*textSpacer, 40, "defense");
      this.DFS = this.add.bitmapText(645+4*textSpacer, 40, 'gem_font', `${peachGirl.defense}%`, 32).setOrigin(0.5);
      this.DFS.tintFill = true;
      this.DFS.setTintFill(0x00BFFF);

      this.add.sprite(570+6*textSpacer, 40, "recovery");
      this.REC = this.add.bitmapText(640+6*textSpacer, 40, 'gem_font', `${peachGirl.recovery}`, 32).setOrigin(0.5);
      this.REC.tintFill = true;
      this.REC.setTintFill(0x00FF00);


      this.pausebutton = new Button(this, 'pausebutton', 620+8*textSpacer, 60).setOrigin(0.5);
      this.savebutton = new Button(this, 'savebutton', centerX-2*textSpacer, centerY+textSpacer).setOrigin(0.5).setScale(2).setVisible(false);
      this.sacrificebutton = new Button(this, 'sacrificebutton', centerX+2*textSpacer, centerY+textSpacer).setOrigin(0.5).setScale(2).setVisible(false);
      
         // this.pause = this.scene.add.bitmapText(centerX, centerY - 32, 'gem_font', 'PAUSE', 32).setOrigin(0.5); 
         this.pause = this.add.sprite(centerX, centerY - 128, 'pausemenu').setOrigin(0.5, 0.5).setScale(0.5).setDepth(3);
         this.pause.anims.play('pausemenu', true);
         //this.togglePause(ispause);
         this.pause.setVisible(ispause);
      
      this.gameover = this.add.sprite(centerX, centerY - 128, 'gameover').setOrigin(0.5, 0.5).setScale(0.5).setVisible(isgameover).setDepth(3);
         this.gameover.anims.play('gameover', true);
         this.restartbutton = new Button(this, 'restartbutton', centerX, centerY+textSpacer).setOrigin(0.5).setScale(2).setVisible(isgameover);
         this.mainmenubutton = new Button(this, 'mainmenubutton', centerX, centerY+3*textSpacer).setOrigin(0.5).setScale(2).setVisible(isgameover);
      
         this.missioncomplete = this.add.sprite(centerX, centerY - 64, 'missioncomplete').setOrigin(0.5, 0.5).setScale(0.5).setVisible(false).setDepth(3);
         this.missioncomplete.anims.play('missioncomplete', true);

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
            this.sound.play('click', { volume: 0.5});
            ischoice = false;
            console.log("once");
            peachGirl.defense += peachGirl.lv;
            peachGirl.recovery += Phaser.Math.RoundTo(peachGirl.lv*1.1, -2);
            console.log(peachGirl.defense);
            this.makechoice.setVisible(ischoice);
            game.scene.resume('playScene');
            

         }else if(gameObject===this.sacrificebutton){
            this.sound.play('click', { volume: 0.5});
            ischoice = false;
            console.log("once");
            peachGirl.attack += Phaser.Math.RoundTo(peachGirl.lv*1.2, -2);
            this.makechoice.setVisible(ischoice);
            game.scene.resume('playScene');
         }else if(gameObject===this.pausebutton){
            this.sound.play('click', { volume: 0.5});
            //if(ispause) return;
            if(isgameover) return;
            ispause = !ispause;
            //this.togglePause(ispause);
            
            
            
            if(ispause) {
               this.pause.setVisible(ispause);
               game.scene.pause('playScene');
               
            }else{
               this.pause.setVisible(ispause);
               game.scene.resume('playScene');
            }

         }else if(gameObject===this.restartbutton) {
            this.sceneA.scene.restart();
            this.sound.play('click', { volume: 0.5});
            isgameover = false;
         }else if(gameObject===this.mainmenubutton) {
            this.sceneA.scene.start("titleScene");
            this.sound.play('click', { volume: 0.5});
            this.scene.stop('gameUI');
            isgameover = false;
         }else { // resume
            this.sound.play('click', { volume: 0.5});
            game.scene.resume('playScene');
         }
      });
      
      
   }

   update() {

      // if(this.scaleGroup != null)
      if(this.sceneA.scaleGroup.getChildren().length <= 0) {
         this.missioncomplete.setVisible(true);
         peachGirl.scene.time.delayedCall(1000, () => {
            this.sceneA.scene.start("titleScene");
            this.scene.stop('Instruction');
            this.scene.stop('gameUI');
            //create tween to fade out audio
            this.tweens.add({
               targets: bgm,
               volume: 0,
               ease: 'Linear',
               duration: 2000,
            });
        }, null, this); 
      }
      if(peachGirl.life <= 0 || moveBar.value <= 0){
         isgameover = true;
         peachGirl.anims.play('playerDeath', true);
         // this.deathtime = peachGirl.scene.time.now;
         peachGirl.scene.time.delayedCall(350, () => {
            game.scene.pause('playScene');
            this.gameover.setVisible(isgameover);
            this.restartbutton.setVisible(isgameover);
            this.mainmenubutton.setVisible(isgameover);
            this.scene.stop('Instruction');
            //create tween to fade out audio
            this.tweens.add({
               targets: bgm,
               volume: 0,
               ease: 'Linear',
               duration: 2000,
            });
        }, null, this); 

      // if(ispause) {
      //    this.pause.setVisible(ispause);
      // }else {
      //    this.pause.setVisible(ispause);
      // }
      //    peachGirl.on('animationcomplete-playerDeath', () => {  // callback after animation completes
      //       
      //   }, this);
         
         // this.gameover.setVisible(isgameover);
         // this.restartbutton.setVisible(isgameover);
         // this.mainmenubutton.setVisible(isgameover);
         // //create tween to fade out audio
         // this.tweens.add({
         //  targets: bgm,
         //  volume: 0,
         //  ease: 'Linear',
         //  duration: 2000,
         //  });
         //  this.scene.scene.start('gameOverScene');
         
     }
   // console.log(peachGirl.scene.time.now, this.deathtime);
   //   if(peachGirl.scene.time.now - this.deathtime > 2000) {
   //      game.scene.pause('playScene');
   //      this.gameover.setVisible(isgameover);
   //       this.restartbutton.setVisible(isgameover);
   //       this.mainmenubutton.setVisible(isgameover);
   //       //create tween to fade out audio
   //       this.tweens.add({
   //        targets: bgm,
   //        volume: 0,
   //        ease: 'Linear',
   //        duration: 2000,
   //        });
   //   }
            

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