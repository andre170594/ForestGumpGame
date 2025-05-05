export default class NivelBase {
    constructor(canvas,jogador, titulo, fundo, config) {
        this.jogador = jogador;
        this.titulo = titulo;
        this.fundo = fundo;

        this.gravidade = config.gravidade || 0.6;
        this.alturaChao = config.alturaChao || 520;
        this.velocidade = config.velocidade || 2;
        this.alturaJump = config.alturaJump || -16;
        this.movimentoHorizontal = config.movimentoHorizontal ?? true;

        this.canvas = canvas;
        this.score = 0;
        this.finalizado = false;
    }



    // Logic
    atualizar() {
        this.jogador.atualizar(this.gravidade, this.alturaChao);
    }
    desenhar(ctx) {
        this.jogador.desenhar(ctx);
    }

    // GETS
    getScore() {
        return this.score;
    }
    getVidas(){
        return this.jogador.vidas;
    }
    getFinalizado() {
        return this.finalizado;
    }
    getTitulo(){
        return this.titulo;
    }
    // SETS

}
