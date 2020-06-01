class UI extends Phaser.Scene {
   
   constructor() {
      super({ key: 'gameUI' });
   }
   create() {
         //this.add.image(6, 26, 'treasure', 'coin_anim_f0.png')
         // const coinsLabel = this.add.text(12, 20, '0', {
         //    fontSize: '14'
         // })

         
      // the move Bar container.
      let movebarcontainer = this.add.sprite(210, 100, "movebarcontainer").setScale(0.8);
      movebarcontainer.setDepth(1);
      this.moveBar = new Movebar(this, 18, 42);
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
      this.ATK.setTintFill(0x000000, 0x000000, 0x000000, 0x000000);
      //console.log(this.ATK.tintFill);
      //this.ATK.setTint(0x6C1010, 0x6C1010, 0x6C1010, 0x6C1010);
      
      console.log(this.ATK);
      this.add.sprite(600+4*textSpacer, 40, "defense");
      this.DFS = this.add.bitmapText(655+4*textSpacer, 40, 'gem_font', `${peachGirl.defense}%`, 32).setOrigin(0.5);

      this.add.sprite(600+6*textSpacer, 40, "recovery");
      this.REC = this.add.bitmapText(655+6*textSpacer, 40, 'gem_font', `${peachGirl.recovery}`, 32).setOrigin(0.5);
      // sceneEvents.on('player-coins-changed', (coins: number) => {
      //    coinsLabel.text = coins.toLocaleString()
      // })
      // this.add.image(centerX+20, centerY+2*textSpacer, 'ui_heart_full')
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
      if(this.moveBar.value <= 0){
         //create tween to fade out audio
         this.scene.tweens.add({
          targets: bgm,
          volume: 0,
          ease: 'Linear',
          duration: 2000,
          });
          this.scene.scene.start('gameOverScene');
     }
      this.handlePlayerHealthChanged(peachGirl.life);
      this.textLv.text = `LV: ${peachGirl.lv}`;
      console.log(peachGirl.exp);
      this.textExp.text = `EXP: ${peachGirl.exp}`;
      this.ATK.text = `${peachGirl.attack}%`;
       this.DFS.text = `${peachGirl.attack}%`;
       this.REC.text = `${peachGirl.recovery}`;

       if(keys.X.isDown) {
         this.moveBar.decrease(0.1);
     }
       
       if(keys.UP.isDown) {
         this.moveBar.decrease(0.05);
     } else if(keys.DOWN.isDown) {
         this.moveBar.decrease(0.05);
     }
     
     if(keys.LEFT.isDown) {
         this.moveBar.decrease(0.05);
     } else if(keys.RIGHT.isDown) {
         this.moveBar.decrease(0.05);
         console.log(this.moveBar.value);
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