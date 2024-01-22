export default class Gato{
    constructor(cena,positionXSprite, positionYSprite){
        this.cena = cena;
        this.sprite = cena.physics.add.sprite(positionXSprite, positionYSprite,'sprite-gato');
        this.sprite.setCollideWorldBounds(true);

        cena.anims.create({
            key:'triste',
            frames: cena.anims.generateFrameNumbers('sprite-gato', {start: 0, end: 2}),
            frameRate: 7,
            repeat: -1
        });

        cena.anims.create({
            key:'feliz',
            frames: cena.anims.generateFrameNumbers('sprite-gato', {start: 3, end: 3}),
            frameRate: 0,
            repeat: -1
        });
    }
}