import Jogador from './jogador.js'
import Peixe from './peixe.js'

let voltouDaBatalha = false;
export default class CenaJogo4 extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaJogo4'
        });
    }

    /*init(data) {
        // Agora os dados passados estão disponíveis através do objeto data
        console.log('data', data);
        if(data === 1){
            console.log('data = 1');
        } else if( data === 2){
            console.log('data = 2');
        } else{
            console.log('fudeu');
        }
        
    }*/

    preload(){}

    create(){
        const largura = this.sys.canvas.width;
        const altura = this.sys.canvas.height;

        this.add.image(largura/2, altura/2, 'fundo4');
        this.peixe = new Peixe(this, 400, 350);
        this.jogador = new Jogador(this, 390, 530);
        this.jogador.sprite.setDepth(1);


        if (this.minhoca != null) {
            console.log("O arquivo da minhoca está sendo carregado.");
          } else {
            console.log("O arquivo da minhoca não está sendo carregado.");
          }

        /* adicionar movimento, o peixe... */

        /* paredes */
        const paredes = this.physics.add.staticGroup();
        paredes.create(316, 610, 'invisivel-vert');
        paredes.create(230, 518, 'invisivel');
        paredes.create(216, 400, 'invisivel-vert');
        paredes.create(250, 211, 'invisivel');

        paredes.create(498, 610, 'invisivel-vert');
        paredes.create(582, 518, 'invisivel');
        paredes.create(582, 400, 'invisivel-vert');
        paredes.create(550, 211, 'invisivel');

        /* jogador colide com as paredes */
        this.physics.add.collider(this.jogador.sprite, paredes);

        /* primeira fala do peixe */
        this.fala1 = this.add.image(200,530, 'peixe-fala1');
        if(voltouDaBatalha){
            this.fala1.setVisible(false);
        }
        

        /* prepara o programa para receber as direções do teclado */
        this.teclas = this.input.keyboard.createCursorKeys();

        /* detectar tecla sendo precionada e chama a função pra valiar */
        this.input.keyboard.on('keydown', this.processKey, this);

        this.podePassar = false;
        this.spaceJustReleased = true;
        this.count = 0;
        this.lerOpcao = false;
    }

    processKey(event){
        const key = event.key;

        if(this.lerOpcao){
            if(/^[a-zA-Z]$/.test(key)){
                if(key === 'a' || key === 'A'){
                    this.add.image(200,530, 'peixe-fala2');
                    this.count = 1;
                } else if( key === 'b' || key === 'B'){
                    this.scene.start('CenaLuta2', {personagem: 2, cenaOrigem: 'CenaJogo4'}); // 2 para peixe, 1 para minhoca
                    voltouDaBatalha = true;
                }
            }
            this.lerOpcao = false;
        }
    }

    update(){
        const paredes = this.physics.add.staticGroup();
        if(!voltouDaBatalha){
            paredes.create(400, 430, 'invisivel');
        }
        

        if(!this.podePassar)
        this.physics.add.collider(this.jogador.sprite, paredes);

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

        /* peixe anims */
        const peixe = this.peixe.sprite;
       if(!voltouDaBatalha){
        peixe.anims.play('boia', true);
       } else {
            peixe.anims.play('nada', true);
       }


       /* passar falas */
       if (Phaser.Input.Keyboard.JustDown(this.teclas.space) && this.spaceJustReleased && !voltouDaBatalha) {
        this.spaceJustReleased = false;
        if(this.count === 0){
            this.add.image(200,530, 'opcao2');
            this.lerOpcao = true;
        } else if(this.count === 1){
            this.add.image(200,530, 'peixe-fala3');
            this.count = 2;
        } else if(this.count === 2){
            this.add.image(200,530, 'peixe-fala4');
            this.count = 3;
        } else if(this.count === 3){
            this.add.image(200,530, 'peixe-fala5');
            this.count = 4;
        } else if(this.count === 4){
            this.add.image(200,530, 'peixe-fala5');
            this.count = 5;
        } else if(this.count === 5){
            this.add.image(200,530, 'peixe-fala6');
        }
        console.log('passa uma fala');
       }

       if(this.teclas.space.isUp){
        this.spaceJustReleased = true;
       }

    }

}

/* preciso configurar a possivel luta com o peixe ta bugadaço desejo dorte pro daniel do futuro */