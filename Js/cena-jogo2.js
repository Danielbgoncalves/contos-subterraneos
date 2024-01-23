import Jogador from './jogador.js'
import Gato from './gato.js'

let orientador = 0; //  0 inicia a personagem no canto esquerdo, 1 no diteito 
let dialogoGato; // para o gato
let dialogoGato2;
let gatoFeliz = false; // mudei aqui pra testar
let dialogoPortao; // para o portao
let visitouMinhoca = false;

export default class CenaJogo2 extends Phaser.Scene {
    constructor(){
        super({
            key: 'CenaJogo2'
        });
    }

    preload(){}

    create(){
        const largura = this.sys.canvas.width;
        const altura = this.sys.canvas.height;
        this.add.image(largura/2, altura/2, 'fundo2');
        this.add.image(490,110, 'portao');
        

        const paredes = this.physics.add.staticGroup();
        paredes.create(280,80,'invisivel');
        paredes.create(200,45, 'invisivel-vert');
        paredes.create(110,130,'invisivel');
        paredes.create(113,105, 'invisivel-vert');
        paredes.create(30,190,'invisivel');
        paredes.create(368,-5, 'invisivel-vert');
        paredes.create(270,30, 'invisivel-vert');
        
        paredes.create(611,65, 'invisivel-vert');
        paredes.create(700,150,'invisivel')
        paredes.create(819,190,'invisivel')
        paredes.create(727,105, 'invisivel-vert');

        paredes.create(479,70,'invisivel') // portao

        paredes.create(745,460,'invisivel');
        paredes.create(660,550, 'invisivel-vert');
        paredes.create(590,550,'invisivel');
        paredes.create(390,550,'invisivel');
        paredes.create(300,564, 'invisivel-vert');
        paredes.create(100,475,'invisivel');
        paredes.create(214,475,'invisivel');

            

        //adiciona os sprites
        this.gato = new Gato(this,240,160);

        if ( orientador === 0){
            this.jogador = new Jogador(this,100,360);
        } else if ( orientador === 1) {
            this.jogador = new Jogador(this,720,360);
        }

        //dialogo do gato
        dialogoGato = this.add.image(600,100,'dialogo1-gato');
        dialogoGato2 = this.add.image(600,100,'dialogo2-gato');
        dialogoGato.setVisible(false);
        dialogoGato2.setVisible(false);
        this.peixeEntregue = false;

        // jogador colide com as paredes
        this.physics.add.collider(this.jogador.sprite, paredes);
        
        //dialogo do portao
        dialogoPortao = this.add.image(600,500,'dialogo-portao');
        dialogoPortao.setVisible(false);

        /* do canto esquerdo, cena 2 para a 1 */
        this.areaMudaCena2 = this.add.zone(13,360).setSize(20,20);
        this.physics.world.enable(this.areaMudaCena2);
        this.physics.add.overlap(this.jogador.sprite, this.areaMudaCena2,this.mudaCenaFunction2, null, this);

        /* do canto direito, cena 2 para a 3 */
        this.areaMudaCena3 = this.add.zone(780,360).setSize(20,20);
        this.physics.world.enable(this.areaMudaCena3);
        this.physics.add.overlap(this.jogador.sprite, this.areaMudaCena3, this.mudaCenaFunction3, null, this);

        /* do portão para a cena 4 */
        this.areaMudaCena5 = this.add.zone(490,70).setSize(100,5);
        this.physics.world.enable(this.areaMudaCena5);
        this.physics.add.overlap(this.jogador.sprite, this.areaMudaCena5, this.mudaCenaFunction5, null, this);

        /* prepara o programa para receber as direções do teclado */
        this.teclas = this.input.keyboard.createCursorKeys();

        // musica
        //this.musica2 = this.sound.add('cena2');
        //this.musica2.play();
        //this.musica2.setLoop(true);
    }

    mudaCenaFunction2(){
        //naCena2 = false;
        //this.musica2.stop();
        orientador = 0;
        this.scene.start('CenaJogo');
    }

    mudaCenaFunction3(){
        //naCena2 = false;
        //this.musica2.stop();
        orientador = 1;
        if(!visitouMinhoca){
            this.scene.start('CenaJogo3');

        }
        visitouMinhoca = true;
    }

    mudaCenaFunction5(){
        // cena do peixe
        if(gatoFeliz){
            this.scene.start('CenaJogo4');
        }
    }

    update(){
        const jogador = this.jogador.sprite;

        if(this.teclas.left.isDown){
            jogador.setVelocityX(-160);
            jogador.setFlip(true, false);
            jogador.anims.play("esquerda", true);
        } else if(this.teclas.right.isDown){
            jogador.setVelocityX(160);
            jogador.setFlip(false, false);
            jogador.anims.play("direita", true);
        } else if(this.teclas.down.isDown){
            jogador.setVelocityY(160);
            jogador.anims.play("baixo", true);
        } else if(this.teclas.up.isDown){
            jogador.setVelocityY(-160);
            jogador.anims.play("cima", true);
        } else {
            jogador.setVelocityY(0);
            jogador.setVelocityX(0);
            jogador.anims.play("idle", true);
        }

        // muda sprite do gato
        const gato = this.gato.sprite;
        if(gatoFeliz){
            gato.anims.play('feliz', true);
        } else {
            gato.anims.play('triste', true);
        }

        
        // mostrar dialogo do gato
        if (Phaser.Math.Distance.Between(jogador.x, jogador.y, gato.x, gato.y) < 60){
            if(!this.peixeEntregue){
                dialogoGato.setVisible(true);
            } else {
                dialogoGato2.setVisible(true);
                gatoFeliz = true;
            }
            
            if (Phaser.Input.Keyboard.JustDown(this.teclas.space) && this.spaceJustReleased && visitouMinhoca ) {
                this.spaceJustReleased = false;
                dialogoGato2.setVisible(true);
                this.peixeEntregue = true;
            }

            if (this.teclas.space.isUp) {
                this.spaceJustReleased = true;
            }    
        } else {
            dialogoGato.setVisible(false);
            dialogoGato2.setVisible(false);
        }

        // mostrar dialogo do portao
        if(Phaser.Math.Distance.Between(jogador.x,jogador.y, 490, 110) < 70){
            if(!gatoFeliz){
                dialogoPortao.setVisible(true);
            }
        } else {
            dialogoPortao.setVisible(false);
        }
    }

}    
