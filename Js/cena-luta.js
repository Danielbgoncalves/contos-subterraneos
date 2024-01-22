import Jogador from './jogador.js'
import Minhoca from './minhoca.js'

let moveBarra = false;
let porcDeVidaGarota = 0.0;
let porcDeVidaMinhoca = 0.0;
let fimDeBatalha = false;

export default class CenaLuta extends Phaser.Scene {
    constructor(){
        super({
            key: 'CenaLuta'
        });
    }

    preload(){

    }

    create(){
        const largura = this.sys.canvas.width;
        const altura = this.sys.canvas.height;
        this.add.image(largura/2, altura/2, 'fundo-luta');

        this.jogador = new Jogador(this, 600, 300);
        this.minhoca = new Minhoca(this, 200, 190);

        //animação garota
        const jogador = this.jogador.sprite;
        jogador.anims.play('idle', true);

        //animação minhoca
        const minhoca = this.minhoca.sprite;
        minhoca.anims.play('padrao', true);

        //movimentação da barra 
        this.barra = this.add.image(310,542, 'barra');
        this.moveBarra = false;

        this.time.delayedCall(3000, function(){
            moveBarra = true;
        }, [], this);

        //nota o espaço, na vdd qualquer tecla
        this.input.keyboard.on('keydown', this.processKey, this);
        
        let vidaGarota2 = this.add.graphics({ fillStyle: { color: 0xd81b60} });
        vidaGarota2.fillRect(566, 370 ,70, 20);
      
        let vidaMinhoca = this.add.graphics({ fillStyle: { color: 0xd81b60} });
        vidaMinhoca.fillRect(165, 370, 70, 20);

        //musica de fundo 
        this.musica = this.sound.add('cenaluta');
        this.musica.play();
        this.musica.setLoop(true); 

    }

    processKey(){
        moveBarra = false;
        //console.log(this.barra.x);
        if(this.barra.x < 346.5 /*|| this.barra.x > 444*/ ){ // vermelho
            //console.log('vermelho');
            porcDeVidaMinhoca -= 9.4;
            this.add.image(400, 460, 'atk9');
        } else if ((this.barra.x > 346.5 && this.barra.x < 363.5) || (this.barra.x > 405.5 && this.barra.x < 426 )){ // amarelo
            //console.log('amarelo');
            porcDeVidaMinhoca -= 14;
            this.add.image(400, 460, 'atk14');
        } else if ((this.barra.x > 363.5 && this.barra.x < 382.5) || this.barra.x > 426 && this.barra.x < 444){ // laranja 
            //console.log('laranja');
            porcDeVidaMinhoca -= 18.4;
            this.add.image(400, 460, 'atk18,5');
        } else {
            //console.log('verde');
            porcDeVidaMinhoca -= 23.4;
            this.add.image(400, 460, 'atk23,5');
        }

        //console.log(porcDeVidaMinhoca);
        if(porcDeVidaMinhoca <= 0-70){
            porcDeVidaMinhoca === 0-70;
            this.add.image(400, 460, 'ganhou');
            moveBarra = false;
            fimDeBatalha = true;
            
            this.time.delayedCall(2000, function(){
                this.musica.stop();
                this.scene.start('CenaJogo3', {venceu: 1});
            }, [], this);
        } 
        
        if(!fimDeBatalha){
            this.minhocaAtaca();
        }  
        console.log('vida da minhoca');
        console.log(porcDeVidaMinhoca);

    }

    minhocaAtaca(){
        //minhoca ataca
        const DataAtual = new Date();
        const segundo = DataAtual.getSeconds();
        

        if(!fimDeBatalha){
            this.time.delayedCall(5000, function(){ // deley pra minhoca atacar 
                if (segundo === 1 || segundo === 2 ){ // perde menos vida, -0 
                    porcDeVidaGarota -= 0.0;
                    this.add.image(400, 460, 'perdeu0');
                    //console.log('perdeu 0');
                } else {
                    porcDeVidaGarota -= 33.0; // perde a metade da vida, -10
                    this.add.image(400, 460, 'perdeu33');
                    if( fimDeBatalha){
                        this.add.image(400, 460, 'perdeu');
                        this.time.delayedCall(2000, function(){
                            location.reload();
                        }, [], this);
                    }
                    
                }
                
                this.barra.x = 310;
                this.time.delayedCall(7000, function(){ // deley pra barra voltar a mexer e jogador ter chance de atacar
                    moveBarra = true;
                }, [], this);
                //if(!fimDeBatalha){
                    //moveBarra = true;
                //}
                
            }, [], this);
        }

        if ( porcDeVidaGarota <= 0-35.0 ) {
            moveBarra = false;
            fimDeBatalha = true;
        }

    }

    

    update(){
        
       //barra amarela de morte
       let vidaGarota = this.add.graphics({ fillStyle: { color: 0x212121} });
       vidaGarota.fillRect(636,370,porcDeVidaGarota, 20);

       
       //ataqueGarota = 0;
       let vidaMinhoca = this.add.graphics({ fillStyle: { color: 0x212121} });
       vidaMinhoca.fillRect(235,370,porcDeVidaMinhoca, 20);
        
        //mover a barra e para-la
        if(moveBarra){
            this.barra.x = this.barra.x + 1.5; // (1.5 pixels por segundo) velocidade da barra
        }
        if(this.barra.x > 484){
            this.barra.x = 310;
            moveBarra = false;
            this.minhocaAtaca();
        }
        if (fimDeBatalha){
            moveBarra = false;
        }
    }
}    