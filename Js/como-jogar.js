export default class ComoJogar extends Phaser.Scene{
    constructor(){
        super({
            key: 'ComoJogar'
        });
    }

    preload(){}

    create(){
        const largura = this.sys.canvas.width;
        const altura = this.sys.canvas.height;
        this.add.image(largura/2, altura/2, 'comoJogar');

        this.input.keyboard.on('keydown', this.processkey, this);
    }

    processkey(event){
        //const key = event.key;

        //console.log('tecla ' + key + ' apertada' );
        ///^[a-zA-Z]$/.test(key)
        /*if(/^[a-zA-Z]$/.test(key)){
            console.log('dentro do if q verifica se e letra');
        }*/
        this.scene.start('Menu')
    }

    update(){}
}