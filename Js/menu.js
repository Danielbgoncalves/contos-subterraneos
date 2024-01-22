export default class Menu extends Phaser.Scene{
    constructor(){
        super({
            key: 'Menu'
        });
    }

    preload(){}

    create(){
        const largura = this.sys.canvas.width;
        const altura = this.sys.canvas.height
        this.add.image(largura/2, altura/2, 'menu');

        this.input.keyboard.on('keydown', this.processkey, this);

        /*let particles = this.add.particles('particula');

        let emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        let logo = this.physics.add.image(400, 100, 'logo');

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);*/
    }

    processkey(event){
        const key = event.key;

        if(/^[a-zA-Z]$/.test(key)){
            if(key === 'a' || key === 'A'){
                this.scene.start('ComoJogar');
            } else if( key === 'b' || key === 'B'){
                this.scene.start('CenaLore');
            }
        }
    }

    update(){

    }




}