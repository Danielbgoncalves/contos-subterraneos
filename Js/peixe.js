export default class Peixe {
    constructor(cena, positionXSprite, positionYSprite){
        this.cena = cena;
        this.sprite = cena.physics.add.sprite(positionXSprite, positionYSprite,'sprite-peixe');
        this.sprite.setCollideWorldBounds(true);

        cena.anims.create({
            key:'mexe',
            frames: cena.anims.generateFrameNumbers('sprite-peixe', {start: 0, end: 1}),
            frameRate: 7,
            repeat: -1
        });
    }
}