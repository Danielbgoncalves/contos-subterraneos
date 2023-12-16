export default  class CenaCarregamento extends Phaser.Scene {
    constructor(){
        super({
            key: 'CenaCarregamento'
        });
    }

    preload(){
        this.load.on('complete', () => {
            this.scene.start('CenaJogo3');
        });

        this.load.image('fundo', 'imagens/fundo1.png');
        this.load.image('invisivel', 'imagens/parede-invisivel.png');
        this.load.image('invisivel-vert', 'imagens/parede-invisivel-vert.png');
        this.load.image('invisivelp', 'imagens/parede-invisivel-p.png');
        this.load.image('dialogo1-gato', 'imagens/dialogo1-gato.png');
        this.load.image('dialogo-portao', 'imagens/dialogo-portao.png');
        this.load.spritesheet('sprite-gato', 'imagens/sprite-gato2.png', {frameWidth:87, frameHeight: 81});
        this.load.spritesheet('sprite-garota', 'imagens/sprite-garota-final.png', {frameWidth: 76, frameHeight: 124});
        this.load.image('fundo2', 'imagens/fundo2.png');
        this.load.image('portao', 'imagens/portao.png');
        this.load.image('fundo3', 'imagens/fundo3.png');
        this.load.spritesheet('sprite-minhoca', 'imagens/minhocag.png', {frameWidth: 228, frameHeight: 350})
    }

    create(){

    }

    update(){
        
    }
}