export default class Peixe{
    constructor(cena, positionX, positionY){
        this.cena = cena;
        this.sprite = cena.physics.add.sprite(positionX, positionY, 'sprite-peixe');
        this.sprite.setCollideWorldBounds(true);

        cena.anims.create({
            key:'boia',  
            frames: cena.anims.generateFrameNumbers('sprite-peixe', {start: 0, end:1}),
            frameRate: 3,
            repeat: -1
        });
        cena.anims.create({
            key:'nada',  
            frames: cena.anims.generateFrameNumbers('sprite-peixe', {start: 2, end:2}),
            frameRate: 3,
            repeat: -1
        });
        
    
    }
}