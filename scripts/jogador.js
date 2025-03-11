export default class Jogador {
    constructor(x, y, largura = 50, altura = 50, cor = "blue", canvas) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.cor = cor;
        this.velocidadeY = 0;
        this.velocidadeX = 0;
        this.noChao = false;
        this.canvas = canvas; // Guarda o canvas
    }

    atualizar(gravidade) {
        // Atualizar posição vertical
        this.velocidadeY += gravidade;
        this.y += this.velocidadeY;

        // Impedir que o jogador caia do chão
        if (this.y + this.altura > this.canvas.height) {
            this.y = this.canvas.height - this.altura;
            this.velocidadeY = 0;
            this.noChao = true;
        }

        // Atualizar posição horizontal
        this.x += this.velocidadeX;

        // Manter o jogador dentro dos limites do canvas
        if (this.x < 0) this.x = 0; // Não deixa sair pela esquerda
        if (this.x + this.largura > this.canvas.width) {
            this.x = this.canvas.width - this.largura; // Não deixa sair pela direita
        }
    }

    desenhar(ctx) {
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }

    saltar() {
        if (this.noChao) {
            this.velocidadeY = -15; // Velocidade do salto
            this.noChao = false;
        }
    }

    mover(direcao) {
        if (direcao === "esquerda") {
            this.velocidadeX = -5; // Velocidade para a esquerda
        } else if (direcao === "direita") {
            this.velocidadeX = 5; // Velocidade para a direita
        }
    }

    parar() {
        this.velocidadeX = 0; // Para a movimentação horizontal
    }
}
