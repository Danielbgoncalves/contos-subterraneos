/* import de todos os personagens que vão poder batalhar */
import Jogador from './jogador.js'
import Minhoca from './minhoca.js'
import Peixe from './peixe.js'


/* variaveis q precisavam ser globais */
let adversaio;
//let funcaoJaChamada = false;
//let paredes;

export default class CenaLuta2 extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaLuta2'
        });
    }

    init(data){
        this.quem; // 1 para minhoca e 2 para peixe
        this.adversario;
        this.vidaAdversaio;
        if(data.personagem === 1){
           this.quem = 1;
           //this.contEra = this.data.contEra;
        } else if(data.personagem === 2){
            this.quem = 2;
        }
        
        this.cenaOrigem = data.cenaOrigem;
        console.log(this.cenaOrigem);
    }

    preload(){}

    create(){
        this.GarotaGanhou = false;
        this.adversarioGanhou = false;

        const largura = this.sys.canvas.width;
        const altura = this.sys.canvas.height;
        this.add.image(largura/2, altura/2, 'fundo-luta');

        //paredes pro coração na hora do ataque
        const paredes = this.physics.add.staticGroup();
        paredes.create(243, 505, 'invisivel-vert');
        paredes.create(320, 583, 'invisivel');
        paredes.create(480, 583, 'invisivel');
        paredes.create(560, 505, 'invisivel-vert');
        paredes.create(320, 423, 'invisivel');
        paredes.create(480, 423, 'invisivel');

        this.areaAtaque = this.add.image(400, 500, 'areaAtaque');
        this.areaAtaque.setVisible(false);

        this.coracao = this.physics.add.sprite(400, 500, 'coracao');
        this.coracao.setVisible(false);
        this.coracao.jaChamouFuncao = false;
        this.physics.add.collider(this.coracao, paredes);
        
        //do ataque, leva 1 
        this.veneno = this.physics.add.image(300, 400, "ataque-minhoca");
        this.veneno.setVisible(false);

        this.veneno2 = this.physics.add.image(500, 400, "ataque-minhoca");
        this.veneno2.setVisible(false);

        console.log("estou funcionando");
        this.physics.add.overlap(this.coracao, this.veneno, this.coracaoTocouAtaque, null, this);
        this.physics.add.overlap(this.coracao, this.veneno2, this.coracaoTocouAtaque, null, this);
        this.tocouxVezes = 0; // coracao tocou no veneno x vezes
        this.caiLeva = false;
        
        //adversario
        if(this.quem === 1){
            this.adversario = new Minhoca(this, 200, 190);
            adversaio = this.adversario.sprite;
            adversaio.anims.play('padrao', true);
            this.vidaAdversaio = 60;
            this.add.image(200, 380, "60de60");
            this.adversario.recedeuDanoXVezes = 0;
        } else if(this.quem === 2){
            this.adversario = new Peixe(this, 200, 295);
            adversaio = this.adversario.sprite;
            adversaio.anims.play('padrao', true);
            this.vidaAdversaio = 10;
            this.add.image(200, 380, "10de10");
            this.adversario.recedeuDanoXVezes = 0;
        }

        //garota             
        this.jogador = new Jogador(this, 600, 300);
        const jogador = this.jogador.sprite;
        jogador.anims.play('idle', true);
        this.add.image(600, 380, "40de40");

        //movimentação da barra 
        this.barra = this.add.image(310,542, 'barra');
        this.barra.setVisible(true);
        this.moveBarra = false;

        this.time.delayedCall(3000, function(){
            this.moveBarra = true;
        }, [], this);

        //define teclaespaço a ser usada na funcao update
        this.teclaEspaco = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //musica de fundo 
        this.musica = this.sound.add('cenaluta');
        this.musica.play();
        this.musica.setLoop(true);

        //criar cursor com teclado
        this.cursor = this.input.keyboard.createCursorKeys();

    }

    ataqueGarota(){
        this.moveBarra = false;

        if(this.barra.x > 382 && this.barra.x < 426){ // se a barra parrar no verde
            this.adversario.recedeuDanoXVezes++;
            console.log("verde");
            this.vidaAdversaio -= 20;
            console.log(this.vidaAdversaio);

            if(this.quem === 2){ //peixe
                this.add.image(200, 380, "0de10");
            }
            if(this.quem === 1){ // minhoca
                if(this.adversario.recedeuDanoXVezes === 1){
                    this.add.image(200, 380, "40de60");
                } else if(this.adversario.recedeuDanoXVezes === 2){
                    this.add.image(200, 380, "20de60");
                } else if(this.adversario.recedeuDanoXVezes === 3){
                    this.add.image(200, 380, "0de60");
                }
            }
        } else {
            console.log("perdeu o ataque");
        }
        

        if(this.vidaAdversaio <= 0){
            this.GarotaGanhou = true;
            this.caiLeva = false;

            this.time.delayedCall(2000, function(){
                this.musica.stop();
                if(this.quem === 1){
                    this.scene.start('CenaJogo3', {venceu: 1});
                } else {
                    this.scene.start(this.cenaOrigem);
                }
            }, [], this);
        }

        //console.log('chegou perto da dunçao adversaioAtaca');
        if(this.vidaAdversaio > 0)
        this.adversarioAtaca();
    }

    adversarioAtaca(){

        //this.add.image(400,200, "remendo");
        //this.veneno.setVisible(false);
        this.barra.setVisible(false);
        this.areaAtaque.setVisible(true);
        //console.log('entrou na função adversaio ataca');
        if(this.quem === 1){
            this.coracao.setVisible(true);
            this.veneno.setVisible(true);
            this.veneno2.setVisible(true);
            this.time.delayedCall(1000, () => {
                this.caiLeva = true;
            });
        } else if (this.quem === 2) {
            this.add.image(200, 380, "10de10");
            this.add.image(400,500, "peixe-infartou");
            this.time.delayedCall(2500, ()=> {
                this.musica.stop();
                this.scene.start(this.cenaOrigem);
            })
        }
        
    }

    coracaoTocouAtaque(){
       
        if(!this.coracao.jaChamouFuncao){
            console.log('tocou');
            this.coracao.setVisible(false);
            this.time.delayedCall(200, ()=> {
                this.coracao.setVisible(true);
            })
            this.coracao.jaChamouFuncao = true;

            this.tocouxVezes++;
        }

        this.time.delayedCall(500, () =>{
            this.coracao.jaChamouFuncao = false;
        })
        
        //dano que a garota esta levando
        if(this.tocouxVezes === 1){
            this.add.image(600, 380, "30de40");
        } else if (this.tocouxVezes === 2){
            this.add.image(600, 380, "20de40");
        } else if(this.tocouxVezes === 3){
            this.add.image(600, 380, "10de40");
        } else if(this.tocouxVezes === 4){
            this.add.image(600, 380, "0de40");
            this.caiLeva = false; 
            this.coracao.setVisible(false);
            this.veneno.setVisible(false);
            this.veneno2.setVisible(false);
            this.time.delayedCall(1000, ()=>{
                this.musica.stop();
                this.scene.start(this.cenaOrigem);
            })
        } 

    }

    update(){

        /*if (this.coracao.tocando(this.veneno)) {
            if (funcaoJaChamada) {
                minhaFuncao();
                funcaoJaChamada = true;
            } else {
                funcaoJaChamada = false;
            }
        } */   


        if(this.moveBarra){
            this.barra.x += 1.5;
        }

        //chama a função quando q tecla espaço é precionada
        if (Phaser.Input.Keyboard.JustDown(this.teclaEspaco)) {
            this.ataqueGarota();
        }

        //movimentar o coracao
        if (this.cursor.left.isDown) {
            this.coracao.setVelocityX(-200);
        } else if (this.cursor.right.isDown) {
            this.coracao.setVelocityX(200);
        } else {
            this.coracao.setVelocityX(0);
        }
        if (this.cursor.up.isDown) {
            this.coracao.setVelocityY(-200);
        } else if (this.cursor.down.isDown) {
            this.coracao.setVelocityY(200);
        } else {
            this.coracao.setVelocityY(0);
        }

        /* fazer os venenos voltarem para cima quando atinjirem y baixo  */

        if (this.caiLeva) {
            this.veneno.y += 1.5;
            this.veneno2.y += 1.5;
            this.veneno2.x -= 1.5;
            if(this.veneno.y > 600 && this.veneno.x == 300){
                this.veneno.y = 400;
                this.veneno.x = 400;
            } else if(this.veneno.y > 600 && this.veneno.x == 400){
                this.veneno.y = 400;
                this.veneno.x = 500;
            } else if(this.veneno.y > 600 && this.veneno.x == 500){
                this.veneno.y = 400;
                this.veneno.x = 300;
                this.caiLeva = false;
                this.areaAtaque.setVisible(false);
                this.barra.setVisible(true);
                this.barra.x = 310;
                this.coracao.setVisible(false);
                this.veneno.setVisible(false);
                this.veneno2.setVisible(false);
                this.time.delayedCall(2000, ()=> {
                    this.moveBarra = true;
                })
            }
             if(this.veneno2.y > 600 /*&& this.veneno2.x == 500*/){
                this.veneno2.y = 400;
                this.veneno2.x = 500;
            } 
          }   
    
    }

}