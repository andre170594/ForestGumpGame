import NivelBase from "./nivelBase.js";
import Obstaculo from "../models/obstaculos.js";

export default class NivelUm extends NivelBase {
    constructor(canvas,jogador, titulo, fundo, config) {
        super(canvas,jogador, titulo, fundo, config);

        // Posição e velocidade do fundo (scroll horizontal)
        this.posFundoX = 0;
        this.velocidadeFundo = this.velocidade;

        // Para controlar quando dar bônus por pontuação
        this.ultimoBonus = 0;

        this.jogador.updateVarsPerLevel(
            0,
            0.5,
            16,
            this.alturaChao - this.jogador.altura + 10,
            3,
            [
                "assets/images/CharLvl1/Run/forrest_frame3.png",
                "assets/images/CharLvl1/Run/forrest_frame4.png",
                "assets/images/CharLvl1/Run/forrest_frame5.png",
                "assets/images/CharLvl1/Run/forrest_frame6.png"
            ],[
                "assets/images/CharLvl1/jump/forrest_jump2.png",
                "assets/images/CharLvl1/jump/forrest_jump2.png",
                "assets/images/CharLvl1/jump/forrest_jump2.png",
                "assets/images/CharLvl1/jump/forrest_jump2.png",
            ]
        );

        // VIDAS E OBSTACULOS
        this.obstaculos = [];
        this.tempoUltimoObstaculo = 0;
        this.tempoUltimaVida = 0;

        this.imgPedra = new Image();
        this.imgPedra.src = "assets/images/pedra.png";

        this.imgTronco = new Image();
        this.imgTronco.src = "assets/images/wood2.png";

        this.imgMuro = new Image();
        this.imgMuro.src = "assets/images/wall2.png";

        this.imgVida = new Image();
        this.imgVida.src = "assets/images/vida.png";

    }

    // Logic
    atualizar() {
        super.atualizar();
        this.atualizarFundo();
        this.criarObstaculos();
        this.criarVidas();
        this.atualizarElementos();
        this.verificarGameOver();
    }
    desenhar(ctx) {

        ctx.drawImage(this.fundo, this.posFundoX, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(this.fundo, this.posFundoX + this.fundo.width, 0, this.canvas.width, this.canvas.height);

        // Obstáculos
        this.obstaculos.forEach(obs => obs.desenhar(ctx));

        // Jogador e HUD
        super.desenhar(ctx);
        // score
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`Score: ${this.getScore()}`, 20, 30);
        // vidas
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`Vidas: ${this.getVidas()}`, 700, 30);
    }
    atualizarFundo() {
        this.posFundoX -= this.velocidadeFundo;
        if (this.posFundoX <= -this.fundo.width) {
            this.posFundoX = 0;
        }
    }
    detectarColisao(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.largura &&
            rect1.x + rect1.largura > rect2.x &&
            rect1.y < rect2.y + rect2.altura &&
            rect1.y + rect1.altura > rect2.y
        );
    }
    criarObstaculos() {
        const agora = Date.now();
        if (agora - this.tempoUltimoObstaculo > 1500) {
            const tipos = [
                { img: this.imgPedra, largura: 30, altura: 30 },
                { img: this.imgTronco, largura: 50, altura: 40 },
                { img: this.imgMuro, largura: 40, altura: 60 },
            ];

            const tipo = tipos[Math.floor(Math.random() * tipos.length)];
            const x = this.canvas.width + Math.random() * 200;
            const y = this.alturaChao - tipo.altura + 10;

            const novoObs = new Obstaculo(x, y, tipo.largura, tipo.altura, tipo.img, false);
            this.obstaculos.push(novoObs);

            this.tempoUltimoObstaculo = agora;
        }
    }
    criarVidas() {
        const agora = Date.now();
        if (agora - this.tempoUltimaVida > 7000) {
            const x = this.canvas.width + Math.random() * 200;
            const largura = 30, altura = 30;
            const y = this.alturaChao - 100;

            const vida = new Obstaculo(x, y, largura, altura, this.imgVida, true);
            this.obstaculos.push(vida);

            this.tempoUltimaVida = agora;
        }
    }
    atualizarElementos() {
        this.obstaculos.forEach(obs => {
            obs.atualizar(this.velocidade);

            if (this.detectarColisao(this.jogador, obs)) {
                if (obs.getIsVida()) {
                    this.jogador.vidas++;
                } else {
                    this.jogador.vidas--;
                    this.jogador.x -= 20;
                }
                obs.x = -999; // remove da tela
            } else if (!obs.getUltrapassado() && obs.getX() + obs.getLargura() < this.jogador.x) {
                obs.setUltrapassado(true);
                if (!obs.getIsVida()) {
                    this.score += 20;
                }
            }
        });

        this.obstaculos = this.obstaculos.filter(obs => obs.getX() + obs.getLargura() > 0);


        // progressao
        if (this.score % 10 === 0 && this.score !== this.ultimoBonus) {
            this.jogador.x += 20;
            this.ultimoBonus = this.score;
        }

    }
    verificarGameOver() {
        if (this.jogador.vidas <= 0 || this.jogador.x > this.canvas.width-100 ) {
            this.finalizado = true;
        }
    }

}
