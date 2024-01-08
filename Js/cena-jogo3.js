import Jogador from './jogador.js'
import Minhoca from './minhoca.js'
import Peixe from './peixe.js'

let a = 0;
let b = true;
let cont;
let peixeColetado = false;

export default class CenaJogo3 extends Phaser.Scene {
    constructor(){
        super({
            key: 'CenaJogo3'
        });
    }

    preload(){}

    create( data ){
        //let cont = 0;
        /*if(data){
            cont = data.cont;
        } else {
            cont = 0;
        }*/
                
        /*if(voltou){
            this.add.image(200, 400, 'coletado');
            cont = 25;
        } else {*/
            cont = 0;
        

        const largura = this.sys.canvas.width;
        const altura = this.sys.canvas.height;
        this.add.image(largura/2, altura/2, 'fundo3');
        
        this.minhoca = new Minhoca(this, 400, 200);
        //this.gifSprite = this.add.sprite(400, 300, 'gif');
        this.jogador = new Jogador(this, 420, 530);
        this.jogador.sprite.setDepth(1);

       /* let config = {
            key: 'gif',
            frames: this.anims.generateFrameNumbers('gif', { start: 0, end: 1, first: 0 }),
            frameRate: 23,
            repeat: -1
        };
    
        this.anims.create(config);
    
        let image = this.add.sprite(400, 300, 'gif');
        image.anims.play('gif');*/
        
        //this.add.image(420,430,'corretivo-amarelo');

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

        //cont = 0;
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
        this.coletarRespostaSombra = false; 
        this.coletarRespostaAouB = false;
        this.coletarRespostaAouBopcao = false;
        this.queComecouBatalha = 0; //1 para garota 2 para minhoca

    }

    init(data) {
        console.log('Dados recebidos:', data);
        if(this.queComecouBatalha === 1){
            //this.add.image(200, 400, 'minhoca-fala6');
            a = 1;

            //cont = 16;
        } else if(this.queComecouBatalha === 2) {
            a = 2;
            //this.add.image(200, 400, 'minhoca-fala7');   
        }
        //if(data.venceu === 1){
            /*this.add.image(200, 400, 'minhoca-fala3');
            a = 1;
            cont = 4;
            console.log('venceu:', data.venceu);*/

        //}
        //console.log('venceu:', data.venceu);
    }

    mudaCenaFunction4(){ /*falta para a musica cena1 quando vai pra luta e falta colocar e parar a musica de luta */
        if(peixeColetado){
           // this.music.stop('cena1');
            this.scene.start('CenaJogo2'/*, {data: cont}*/);
        }
    
    }
    

    processKey(event){
        const key =  event.key ;

        if(this.coletarRespostaAouB){ // a = batalha e b = conversa
            if(/^[a-zA-Z]$/.test(key)){
                this.resposta = key;
                console.log('vai ler o q eu digitar ');
                if(this.resposta.toLowerCase() === 'a'){
                    this.scene.start('CenaLuta');
                    this.queComecouBatalha = 1;
                } else if (this.resposta.toLowerCase() === 'b'){
                    this.add.image(200, 400, 'garota-fala1');
                    cont ++;
                }
            }
            this.coletarRespostaAouB = false;
        }

        if(this.coletarRespostaAouBopcao){
            if(/^[a-zA-Z]$/.test(key)){

                this.resposta = key;
                console.log('vai ler o q eu digitar ');
                if(this.queComecouBatalha === 0){ // nao houve batalha
                    console.log('considera que nao houve batalha'); 
                    if(this.resposta.toLowerCase() === 'a'){
                        this.add.image(200, 400, 'minhoca-fala12'); // pediu peixe 
                        this.peixeAnims = true;
                        //adicionar o sprite do peixe
                    } else if (this.resposta.toLowerCase() === 'b'){
                        this.add.image(200, 400, 'minhoca-fala11'); // pediu pra sair
                        this.peixeAnims = true;
                    }
                } else if (this.queComecouBatalha != 0) { // houve batalha 
                    if(this.resposta.toLowerCase() === 'a'){
                        this.add.image(200, 400, 'minhoca-fala9'); // pediu peixe 
                        this.peixeAnims = true;
                        //cont ++; // pediu pra sair
                    } else if (this.resposta.toLowerCase() === 'b'){
                        this.add.image(200, 400, 'minhoca-fala8'); // pediu pra sair
                        cont = 11;
                        b = true;
                    }
                }
                //this.coletarRespostaAouBopcao = false;
            }
            this.coletarRespostaAouBopcao = false;
        }
        
        if(this.coletarRespostaSombra){
            if (/^[a-zA-Z0-9]$/.test(key)) {

                this.respostaUser += key;
                console.log(key);
                console.log(this.respostaUser);
    
            } else if ( key === 'Enter') {
    
                if(this.respostaUser.toLowerCase() === 'sombra' || this.respostaUser.toLowerCase() === 'suasombra' || this.respostaUser.toLowerCase() === 'asuasombra'){
                    // tudo certo, voce acertou
                    console.log('acertou');
                    this.add.image(200, 400, 'minhoca-fala10');
                    cont = 11;
                } else {
                    //cenario em que a personagem errou.
                    console.log('errou');
                    this.add.image(200, 400, 'minhoca-fala13');
                    this.time.delayedCall(7000, function(){
                        this.scene.start('CenaLuta');
                    }, [], this);
                    this.queComecouBatalha = 2;
                }
                
                this.coletarRespostaSombra = false;
                this.respostaUser = '';
            }
        }
        
    }

    update(){
        const jogador = this.jogador.sprite;
        //const peixe = this.peixe.sprite;

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
        
        if(cont === 0){
            if(a === 1){
                this.add.image(200, 400, 'minhoca-fala6');
                cont = 21;
            } else if(a === 2){
                this.add.image(200, 400, 'minhoca-fala7');
                cont = 21;
            } else {
                this.add.image(largura + this.incremento, altura + this.incremento, 'minhoca-fala1');
            }

        }

        if (Phaser.Input.Keyboard.JustDown(this.teclas.space) && this.spaceJustReleased) {
            this.incremento = 200;
            this.spaceJustReleased = false;
            if (cont === 0){
                this.add.image(200, 400, 'minhoca-fala1');
                cont = cont + 1;
            } else if(cont === 1 ) {
                this.add.image(200, 400, 'minhoca-fala2');
                cont ++;
            } else if(cont === 2 ) {
                this.add.image(200, 400, 'luta-cvs');
                this.coletarRespostaAouB = true;
                //cont ++;
            } else if(cont === 3 ) {
                this.add.image(200, 400, 'garota-fala1');
                cont ++;
            } else if(cont === 4 ) {
                this.add.image(200, 400, 'minhoca-fala3');
                cont ++;
            } else if(cont === 5 ) {
                this.add.image(200, 400, 'minhoca-fala4');
                cont ++;
            } else if(cont === 6 ) {
                this.add.image(200, 400, 'garota-fala2');
                cont ++;
            } else if(cont === 7 ) {
                this.add.image(200, 400, 'garota-fala3');
                cont ++;
            } else if(cont === 8 ) {
                this.add.image(200, 400, 'minhoca-fala5');
                this.coletarRespostaSombra = true;
                //cont ++;
            } else if(cont === 9 ) { // o jogador errou a resposta 
                this.add.image(200, 400, 'minhoca-fala13 ');
                //cont ++;
            } else if(cont === 10 ) { //jogador acertou a resposta
                this.add.image(200, 400, 'minhoca-fala10');
                cont ++;
            } else if(cont === 11 && b ) { // logica diferente dos outtros 'opcao' pois vai levar para outras respostas
                this.add.image(200, 400, 'opcao');
                this.coletarRespostaAouBopcao = true;
                b = false;
                //cont ++;
            } /*else if(cont === 12 ) { // pediu pra sair
                this.add.image(200, 400, 'minhoca-fala11');
                //cont ++;
            } else if(cont === 13 ) { // pediu peixe
                this.add.image(200, 400, 'minhoca-fala12');
                //cont ++;
            }*/ else if(cont === 15 ) { // jogador iniciou a batalha e venceu 
                this.add.image(200, 400, 'minhoca-fala6');
                cont ++;
            } /*else if(cont === 16 ) {
                this.add.image(200, 400, 'opcao'); // falta fazer essa logica de escolha
                //cont ++;
            }*/ else if(cont === 16 ) { // pediu pra sair
                this.add.image(200, 400, 'minhoca-fala8');
                cont ++;
            } else if(cont === 16 ) { // pediu o peixe 
                this.add.image(200, 400, 'minhoca-fala9');
                cont ++;
            } else if(cont === 20 ) { // a minhoca começou a batalha e o jogador ganhou
                this.add.image(200, 400, 'minhoca-fala7');
                cont ++;
            } else if(cont === 21 && b) { // levar para amesma logica do 'opcao' de cima, e mesmas respostas
                this.add.image(200, 400, 'opcao');
                b = false;
                this.queComecouBatalha = 1;
                this.coletarRespostaAouBopcao = true;
            } else if(cont === 25) { 
                this.add.image(200, 400, 'coletado');
                /*this.peixeAnims = false;
                this.add.image(420,430,'corretivo-amarelo');*/
            } 
        }

        if (this.teclas.space.isUp) {
            this.spaceJustReleased = true;
        }

        /*testar*/
        if(this.peixeAnims){
            //this.gifSprite.anims.play('gifAnimation');
            this.add.image(420,430,'peixe');
            this.add.image(410,440,'peixe');
            this.add.image(423,446,'peixe');
            this.coletaPeixe = true;
            console.log('desenhou');           
        }

        if(this.coletaPeixe){
            if(jogador.y < 430 && jogador.y >400 && jogador.x > 410 && jogador.x < 423 ){
                cont = 25;
                this.peixeAnims = false;
                this.add.image(200, 400, 'coletado');
                this.add.image(420, 430, 'peixe').setVisible(false);
                this.add.image(410, 440, 'peixe').setVisible(false);
                this.add.image(423, 446, 'peixe').setVisible(false);
                this.add.image(425,438,'corretivo-amarelo');
                peixeColetado = true;
            }
        }

    }
}