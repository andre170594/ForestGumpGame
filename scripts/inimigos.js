export default class Inimigo {
    constructor(x, y, largura = 50, altura = 50, cor = "red", velocidadeX = -2) {
        this.x = x; // Posição horizontal
        this.y = y; // Posição vertical
        this.largura = largura; // Largura do inimigo
        this.altura = altura; // Altura do inimigo
        this.cor = cor; // Cor do inimigo
        this.velocidadeX = velocidadeX; // Velocidade de movimento horizontal
    }

    desenhar(ctx) {
        ctx.fillStyle = this.cor; // Define a cor do inimigo
        ctx.fillRect(this.x, this.y, this.largura, this.altura); // Desenha o inimigo como um retângulo
    }

    atualizar() {
        this.x += this.velocidadeX; // Move o inimigo horizontalmente (esquerda por padrão)
    }

    foraDoCanvas(canvasWidth) {
        // Verifica se o inimigo saiu totalmente do canvas
        return this.x + this.largura < 0;
    }
}
