import Jogador from './jogador.js'
import Minhoca from './minhoca.js'

let moveBarra = false;
let porcDeVidaGarota = 0.0;
let porcDeVidaMinhoca = 0.0;
let fimDeBatalha = false;
let a = 0;

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

        //animação heroina
        const jogador = this.jogador.sprite;
        jogador.anims.play('idle', true);

        //movimentação da barra 
        this.barra = this.add.image(310,542, 'barra');
        this.moveBarra = false;

        this.time.delayedCall(1000, function(){
            moveBarra = true;
        }, [], this);

        //nota o espaço
        this.input.keyboard.on('keydown', this.processKey, this);

        
        let vidaGarota2 = this.add.graphics({ fillStyle: { color: 0xd81b60} });
        vidaGarota2.fillRect(566, 370 ,70, 20)

        
      
        let vidaMinhoca = this.add.graphics({ fillStyle: { color: 0xd81b60} });
        vidaMinhoca.fillRect(165, 370, 70, 20)

    }

    processKey(){
        moveBarra = false;
        //console.log(this.barra.x);
        if(this.barra.x < 346.5 /*|| this.barra.x > 444*/ ){ // vermelho
            //console.log('vermelho');
            porcDeVidaMinhoca -= 9.4;
        } else if ((this.barra.x > 346.5 && this.barra.x < 363.5) || (this.barra.x > 405.5 && this.barra.x < 426 )){ // amarelo
            //console.log('amarelo');
            porcDeVidaMinhoca -= 14;
        } else if ((this.barra.x > 363.5 && this.barra.x < 382.5) || this.barra.x > 426 && this.barra.x < 444){ // laranja 
            //console.log('laranja');
            porcDeVidaMinhoca -= 18.4;
        } else {
            //console.log('verde');
            porcDeVidaMinhoca -= 23.4;
        }

        //console.log(porcDeVidaMinhoca);
        if(porcDeVidaMinhoca <= 0-70){
            porcDeVidaMinhoca === 0-70;
            console.log('voce venceu');
            moveBarra = false;
            fimDeBatalha = true;
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
            this.time.delayedCall(2000, function(){
                if (segundo === 1 || segundo === 2 ){ // perde menos vida, -0 
                    porcDeVidaGarota -= 0.0;
                    //console.log('perdeu 0');
                } else {
                    porcDeVidaGarota -= 35.0; // perde a metade da vida, -10
                    //a++;
                    //console.log('perdeu 35');
                }
                
                this.barra.x = 310;
                if(!fimDeBatalha){
                    moveBarra = true;
                }
                //console.log(porcDeVidaGarota);
                
    
            }, [], this);
        }

        if ( porcDeVidaGarota <= 0-35.0 ) {
            console.log('voce perdeu')
            moveBarra = false;
            fimDeBatalha = true;
        }

        console.log('vida da garota');
        console.log(porcDeVidaGarota);

        //fim do minhohca ataca
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
            this.barra.x = this.barra.x + 0.3;
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