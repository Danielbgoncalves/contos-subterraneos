import CenaCarregamento from './cena-carregamento.js'; 
import Menu from './menu.js';
import ComoJogar from './como-jogar.js'
import CenaLore from './cena-lore.js';
import CenaJogo from './cena-jogo.js'; 
import CenaJogo2 from './cena-jogo2.js'; 
import CenaJogo3 from './cena-jogo3.js';
import CenaJogo4 from './cena-jogo4.js'
import CenaLuta from './cena-luta.js'
import CenaLuta2 from './cena-luta2.js'


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'canvas',
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },
    scene: [
        CenaCarregamento,
        Menu,
        ComoJogar,
        CenaLore,
        CenaJogo,
        CenaJogo2,
        CenaJogo3,
        CenaJogo4,
        CenaLuta,
        CenaLuta2

    ]
}

const jogo = new Phaser.Game(config);