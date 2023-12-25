export default class CenaLore extends Phaser.Scene {
    constructor(){
        super({
            key: 'CenaLore'
        });
    }

    preload(){

    }

    create(){
        const largura = this.sys.canvas.width;
        const altura = this.sys.canvas.height;
        this.add.image(largura/2, altura/2, 'lore-texto0');

        this.teclas = this.input.keyboard.createCursorKeys();
        this.cont = 0;
        this.spaceJustReleased = true;

        //sprite indicando clicar em 'espaço'
        this.sprite = this.physics.add.sprite(740, 550,'sprite-espaco');

    }

    update(){
        const largura = this.sys.canvas.width;
        const altura = this.sys.canvas.height;
        
        if (Phaser.Input.Keyboard.JustDown(this.teclas.space) && this.spaceJustReleased) {
            this.spaceJustReleased = false;
            if (this.cont === 0){
                this.add.image(largura/2, altura/2, 'lore-andando');
                this.cont = this.cont + 1;
            } else if(this.cont === 1 ) {
                this.add.image(largura/2, altura/2, 'lore-texto1');
                this.cont ++;
            } else if(this.cont === 2 ) {
                this.add.image(largura/2, altura/2, 'lore-caindo');
                this.cont ++;
            } else if(this.cont === 3 ) {
                this.add.image(largura/2, altura/2, 'lore-texto2');
                this.cont ++;
            } else if(this.cont === 4 ) {
                this.scene.start('CenaJogo');
            }
        }
    
        if (this.teclas.space.isUp) {
            this.spaceJustReleased = true;
        }
    } 

}