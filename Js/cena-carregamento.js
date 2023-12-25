export default  class CenaCarregamento extends Phaser.Scene {
    constructor(){
        super({
            key: 'CenaCarregamento'
        });
    }

    preload(){
        this.load.on('complete', () => {
            this.scene.start('CenaLore');
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
        this.load.image('lore-texto0', 'imagens/lore-texto0.png');
        this.load.image('lore-texto1', 'imagens/lore-texto1.png');
        this.load.image('lore-texto2', 'imagens/lore-texto2.png');
        this.load.image('lore-andando', 'imagens/lore-andando.png');
        this.load.image('lore-caindo', 'imagens/lore-caindo.png');
        this.load.spritesheet('sprite-espaco', 'imagens/sprite-espaco.png', {frameWidth: 100, frameHeight: 70});
        this.load.image('minhoca-fala1', 'imagens/minhoca-fala1.png');
        this.load.image('minhoca-fala2', 'imagens/minhoca-fala2.png');
        this.load.image('minhoca-fala3', 'imagens/minhoca-fala3.png');
        this.load.image('minhoca-fala4', 'imagens/minhoca-fala4.png');
        this.load.image('minhoca-fala5', 'imagens/minhoca-fala5.png');
        this.load.image('garota-fala1', 'imagens/garota-fala1.png');
        this.load.image('garota-fala2', 'imagens/garota-fala2.png');
        this.load.image('garota-fala3', 'imagens/garota-fala3.png');
        this.load.image('instrucao', 'imagens/instrucao.png');


        
    }

    create(){

    }

    update(){
        
    }
}
