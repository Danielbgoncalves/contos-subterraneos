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
        
        this.minhoca = new Minhoca(this, 400, 200);
        this.jogador = new Jogador(this, 420, 530);

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

        this.physics.add.collider(this.jogador.sprite, paredes);

        this.teclas = this.input.keyboard.createCursorKeys();

        this.cont = 0;
        this.incremento = 0;
        this.spaceJustreleased = true;

        //add um evento para responder a entradas do teclado 
        this.input.keyboard.on('keydown', this.processKey, this);

        //inicializa a variavel que armazena a resposta
        this.respostaUser = '';

        //area pra voltar pra cena 2
        this.areaMudaCena4 = this.add.zone(420,600).setSize(120,10);
        this.physics.world.enable(this.areaMudaCena4);
        this.physics.add.overlap(this.jogador.sprite, this.areaMudaCena4, this.mudaCenaFunction4, null, this);
        this.coletarResposta = false;

    }

    mudaCenaFunction4(){
        this.scene.start('CenaJogo2');
    }
    

    processKey(event){
        const key =  event.key ;
        
        if(this.coletarResposta){
            if (/^[a-zA-Z0-9]$/.test(key)) {

                this.respostaUser += key;
                console.log(key);
                console.log(this.respostaUser);
    
            } else if ( key === 'Enter') {
    
                if(this.respostaUser.toLowerCase() === 'sombra' || 'suasombra' || 'asuasombra'){
                    // tudo certo, voce acertou
                    console.log('acertou');
                } else {
                    //cenario em que a personagem errou.
                    console.log('errou');
                }
                
                this.coletarResposta = false;
                this.respostaUser = '';
            }
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

        //animação minhoca
        const minhoca = this.minhoca.sprite;
        minhoca.anims.play('padrao', true);

        //passagem dos dialogos:
        const largura = 200;
        const altura = 400;
        
        if(this.cont === 0){
            this.add.image(largura + this.incremento, altura + this.incremento, 'minhoca-fala1');
        }

        if (Phaser.Input.Keyboard.JustDown(this.teclas.space) && this.spaceJustReleased) {
            this.incremento = 200;
            this.spaceJustReleased = false;
            if (this.cont === 0){
                this.add.image(200, 400, 'minhoca-fala1');
                this.cont = this.cont + 1;
            } else if(this.cont === 1 ) {
                this.add.image(200, 400, 'minhoca-fala2');
                this.cont ++;
            } else if(this.cont === 2 ) {
                this.add.image(200, 400, 'garota-fala1');
                this.cont ++;
            } else if(this.cont === 3 ) {
                this.add.image(200, 400, 'minhoca-fala3');
                this.cont ++;
            } else if(this.cont === 4 ) {
                this.add.image(200, 400, 'minhoca-fala4');
                this.cont ++;
            } else if(this.cont === 5 ) {
                this.add.image(200, 400, 'garota-fala2');
                this.cont ++;
            } else if(this.cont === 6 ) {
                this.add.image(200, 400, 'garota-fala3');
                this.cont ++;
            } else if(this.cont === 7 ) {
                this.add.image(200, 400, 'minhoca-fala5');
                this.coletarResposta = true;
                this.cont ++;
            }
        }

        if (this.teclas.space.isUp) {
            this.spaceJustReleased = true;
        }
    }
}