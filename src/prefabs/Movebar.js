class Movebar extends Phaser.GameObjects.Graphics {

   constructor(scene, x, y) {
       super(scene);

       
       this.x = x;
       this.y = y;
       this.value = 366;
console.log(this.x, this.y);
       this.draw();

       scene.add.existing(this);
   }

   decrease(amount) {
       this.value -= amount;

       if (this.value < 0) {
           this.value = 0;
       }

       this.draw();

       return (this.value === 0);
   }

   increase(amount) {
       this.value += amount;

       if (this.value >300) {
           this.value = 300;
       }

       this.draw();

       return (this.value === 0);
   }

   draw() {
       this.clear();

       //  BG
       this.fillStyle(0x000000);
       //this.fillRect(this.x, this.y, 368, 30);

       //  Health

       this.fillStyle(0xffffff);
       //this.fillStyle(0x000000);
       //this.fillRect(this.x + 2, this.y + 2, 366, 26);

       if (this.value < 50) {
           this.fillStyle(0xff0000);
       }
       else {
           this.fillStyle(0x00ff00);
       }

       this.fillRect(this.x + 2, this.y + 2, this.value, 26);
   }

}