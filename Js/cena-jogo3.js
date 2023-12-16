import Jogador from './jogador.js'
import Minhoca from './minhoca.js'

export default class CenaJogo3 extends Phaser.Scene {
    constructor(){
        super({
            key: 'CenaJogo3'
        });
    }

    preload(){

    }

    create(){
        const largura = this.sys.canvas.width;
        const altura = this.sys.canvas.height;
        this.add.image(largura/2, altura/2, 'fundo3');
        
        this.minhoca = new Minhoca(this,400,200);
        this.jogador = new Jogador(this, 410,550);

        const paredes = this.physics.add.staticGroup();
        paredes.create(210,517, 'invisivel');
        paredes.create(110,517, 'invisivel');
        paredes.create(15,160, 'invisivel-vert');
        paredes.create(15,420, 'invisivel-vert');
        paredes.create(170,178, 'invisivel');
        paredes.create(530,602, 'invisivel-vert');
        paredes.create(617,517, 'invisivel');
        paredes.create(697,517, 'invisivel');
        paredes.create(785,320, 'invisivel-vert');
        paredes.create(785,160, 'invisivel-vert');
        paredes.create(94,195, 'invisivel-vert');
        paredes.create(130,195, 'invisivel-vert');
        paredes.create(199,195, 'invisivel-vert');
        paredes.create(697,178, 'invisivel');
        //ao redor da minhoca
        paredes.create(390,260, 'invisivel');
        paredes.create(500,175, 'invisivel');
        paredes.create(515,175, 'invisivel-vert');
        paredes.create(285,175, 'invisivel-vert');
        paredes.create(699,195, 'invisivel-vert');
        paredes.create(595,195, 'invisivel-vert');
        paredes.create(630,195, 'invisivel-vert');
        //paredes.create(650,279, 'invisivelp');
        //paredes.create(140,280, 'invisivelp');
        

        // jogador colide com as paredes
        this.physics.add.collider(this.jogador.sprite, paredes);

        this.teclas = this.input.keyboard.createCursorKeys();
    }

    update(){
        /*this.input.on('pointerdown', function (pointer) {
            console.log(this.input.mousePointer.x, this.input.mousePointer.y);
        });*/

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

        //animação minhoca
        const minhoca = this.minhoca.sprite;
        minhoca.anims.play('padrao', true);

        // this.physics.add.collider(this.jogador.sprite, this.minhoca.sprite);
        //isso noa da certo, a minhoca sai deslizando, nao sei pq.

    }
}