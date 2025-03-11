export default class Obstaculo {
    constructor(x, y, largura, altura, cor = "red") {
        this.x = x;                                                 // Posição horizontal
        this.y = y;                                                 // Posição vertical
        this.largura = largura;                                     // Largura do obstáculo
        this.altura = altura;                                       // Altura do obstáculo
        this.cor = cor;                                             // Cor do obstáculo
    }

    desenhar(ctx) {
        ctx.fillStyle = this.cor;                                   // Define a cor do obstáculo
        ctx.fillRect(this.x, this.y, this.largura, this.altura);    // Desenha o obstáculo como um retângulo
    }

    atualizar(velocidade) {
        this.x -= velocidade;                                       // Move o obstáculo para a esquerda
    }

    foraDoCanvas(canvasWidth) {
        return this.x + this.largura < 0;
    }
}
