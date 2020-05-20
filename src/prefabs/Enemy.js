class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, enemyName, xposition, ypostion) {
        //this.type = Phaser.Math.RND.pick(['normal', 'gooey', 'runny']);
        //console.log('expected object is:'+type);
        // call Phaser Physics Sprite constructor
        super(scene, xposition, ypostion, enemyName); 

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.name = enemyName;
        this.setDrag(100,100);
        
		this.valid			= true;												
		//this.x				= xposition - (this.width/2);							
		//this.y				= xposition - (this.height/2);							
        this.move			= enemyData[enemyName]["move"];					
        this.health         = enemyData[enemyName]["health"];	
        this.range		= enemyData[enemyName]["range"];
        this.interval		= enemyData[enemyName]["interval"];
		this.lv				= enemyData[enemyName]["lv"];						
		this.exp			= enemyData[enemyName]["exp"];					
		
		
		this.velocityX		= 0;
		this.velocityY		= 0;
		this.nextMove		= 0;
		
		
        //this.nextMove = getRandInt(this.move.length);
        this.nextMove = Phaser.Math.RND.integerInRange(0, this.move.length-1);
        this.scene = scene;
        console.log(this.move);
        console.log("nextMove:"+this.nextMove);

        if(this.valid){
            
        this.gameTimer = this.scene.time.addEvent({
            delay: this.interval,
            callback: ()=>{
                
                 this.velocityX = this.move[this.nextMove][0];
                this.velocityY = this.move[this.nextMove][1];
                //console.log(this.velocityX);
                
                this.nextMove++;
                if(this.nextMove >= this.move.length){
                    this.nextMove = 0;
                }
                if(this.velocityX > 0)
                    this.setFlip(true,false);
                else
                    this.setFlip(false,false);
               
                // this.x += this.velocityX;
                // this.y += this.velocityY;
                this.body.setVelocity(this.velocityX*5, this.velocityY*5);
            },
            callbackScope: this,
            loop: true,
            //timeScale: 0.1
        });
        
        
        
    }

    }

    update() {
        // override physics sprite update()
        super.update();

        //this.scene.physics.arcade.distanceToObject(peachGirl, this)
        if(this.name == 'boss'){
            //console.log(Phaser.Math.Distance.BetweenPoints(peachGirl, this));
            if(Phaser.Math.Distance.BetweenPoints(peachGirl, this)<400){
                this.scene.physics.moveToObject(this, peachGirl, 20);
            }

        }
        
        // // add new barrier when existing barrier hits center X
        // if(this.newBarrier && this.x < centerX) {
        // //if(this.newBarrier) {
        //     this.newBarrier = false;
        //     // call parent scene method from this context
        //     this.scene.addBarrier(this.parent, this.velocity);
        // }

        // // destroy paddle if it reaches the left edge of the screen
        // if(this.x < -this.width) {
        //     this.destroy();
        // }
    }
}