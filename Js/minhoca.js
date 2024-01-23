export default class Minhoca{
    constructor(cena, positionXsprite, positionYsprite){
        this.cena = cena;
        this.sprite = cena.physics.add.sprite(positionXsprite, positionYsprite, 'sprite-minhoca');
        this.sprite.setCollideWorldBounds(true);

        cena.anims.create({
            key: 'padrao',
            frames: cena.anims.generateFrameNumbers('sprite-minhoca', {strat: 0, end: 3}),
            frameRate: 10,
            repeat:-1
        });
        }
}