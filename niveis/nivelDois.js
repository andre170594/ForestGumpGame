import NivelBase from "./nivelBase.js";

export default class NivelDois extends NivelBase {
    constructor(canvas,jogador, titulo, fundo, config) {
        super(canvas,jogador, titulo, fundo, config);

        this.posFundoX = 0;
        this.velocidadeFundo = this.velocidade;
    }

    atualizar(canvas) {
        super.atualizar();

        // Movimento horizontal do jogador
        if (this.movimentoHorizontal) {
            this.jogador.x += this.velocidade;
        }

        // Scroll do fundo
        this.posFundoX -= this.velocidadeFundo;
        if (this.posFundoX <= -this.fundo.width) {
            this.posFundoX = 0;
        }

        // Atualiza o score
        this.score += 0.3;

        // Exemplo de finalização do nível
        if (this.jogador.x > this.canvas.width) {
            this.finalizado = true;
        }
    }

    desenhar(ctx) {
        // Fundo com scroll
        ctx.drawImage(this.fundo, this.posFundoX, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(this.fundo, this.posFundoX + this.fundo.width, 0, this.canvas.width, this.canvas.height);

        // Jogador e HUD
        super.desenhar(ctx);
    }
}
