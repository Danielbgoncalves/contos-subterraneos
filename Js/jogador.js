export default class Jogador {
    constructor(cena, posicaoXSprite, posiaoYSprite){
        this.cena = cena;
        //let posicaoXSprite = 400;
        //let posiaoYSprite = 220;
        this.sprite = cena.physics.add.sprite(posicaoXSprite,posiaoYSprite, 'sprite-garota');
        //this.sprite = cena.physics.add.sprite(posicaoXSprite,posiaoYSprite, 'garota-idle');
        //this.sprite = cena.physics.add.sprite(posicaoXSprite,posiaoYSprite, 'garota-andando');
        /*this.sprite.setBounce(0.2); seria pra quando cair com a gravidade dar uma quicada */
        this.sprite.setCollideWorldBounds(true);

        cena.anims.create({
            key: 'direita',
            frames: cena.anims.generateFrameNumbers('sprite-garota', { start: 0, end: 1}),
            frameRate: 7,
            repeat: -1
        });

        cena.anims.create({
            key: 'esquerda',
            frames: cena.anims.generateFrameNumbers('sprite-garota', { start: 0, end: 1}),
            frameRate: 7,
            repeat: -1
        });

        cena.anims.create({
            key: 'cima',
            frames: cena.anims.generateFrameNumbers('sprite-garota', { start: 4, end: 6}),
            frameRate: 7,
            repeat: -1
        });

        cena.anims.create({
            key: 'baixo',
            frames: cena.anims.generateFrameNumbers('sprite-garota', { start: 2, end: 3}),
            frameRate: 7,
            repeat: -1
        });

        cena.anims.create({
            key: 'idle',
            frames: cena.anims.generateFrameNumbers('sprite-garota', {start:7, end: 11}),
            frameRate: 4,
            repeat: -1
        });


    }
}