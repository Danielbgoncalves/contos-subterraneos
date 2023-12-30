import Jogador from './jogador.js'

let voltou = false; // para a menina voltar na posição certa para a cena 1
export default class CenaJogo extends Phaser.Scene {
    constructor(){
        super({
            key: 'CenaJogo'
        });
    }

    preload(){

    }

    create(){ 
        const largura = this.sys.canvas.width;
        const altura = this.sys.canvas.height
        this.add.image(largura/2, altura/2, 'fundo');
        
        //const plataformas = this.physics.add.staticGroup();
        //plataformas.create(largura/2,altura-14,'parede-escura-hor');
        //plataformas.create(largura/2,25,'parede-escura-hor');
        //plataformas.create(25,altura/2,'parede-escura-ver');

        /* resolvido  TAVA AQUI, ADICIONAR VARIAVEL PRA QUANDO MENINA VOLTAR ELA VOLTAR NO LUGRA CERTO QUANDO VOLTAR PRA CENA 1  */
        
        if(voltou){
            this.jogador = new Jogador(this, 700,500);
        } else {
            this.jogador = new Jogador(this, 400, 220);
        }

        this.areaMudaCena = this.add.zone(780,500).setSize(20,20);
        this.physics.world.enable(this.areaMudaCena);

        this.physics.add.overlap(this.jogador.sprite, this.areaMudaCena, this.mudaCenaFunction,null,this);

        this.teclas = this.input.keyboard.createCursorKeys();

        //musica de fundo 
        this.musica = this.sound.add('cena1');
        this.musica.play();
        this.musica.setLoop(true); 
    }

    mudaCenaFunction(){
        //this.musica.stop();
        this.scene.start('CenaJogo2');
        voltou = true;
    }

    update(){
        const jogador = this.jogador.sprite;

        if(this.teclas.left.isDown){
            jogador.setVelocityX(-160);
            jogador.setFlip(true, false);
            jogador.anims.play('esquerda', true);
        } else if(this.teclas.right.isDown){
            jogador.setVelocityX(160);
            jogador.setFlip(false, false);
            jogador.anims.play('direita', true);
        } else if(this.teclas.down.isDown){
            jogador.setVelocityY(160);
            jogador.anims.play('baixo', true);
        } else if(this.teclas.up.isDown){
            jogador.setVelocityY(-160);
            jogador.anims.play('cima', true);
        } else {
            jogador.setVelocityX(0);
            jogador.setVelocityY(0);
            jogador.anims.play('idle', true);
        }
    }
}