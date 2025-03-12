export default class Jogador {
    constructor(x, y, largura = 50, altura = 50, cor = "blue") {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.cor = cor;

        this.velocidadeY = 0;
        this.velocidadeX = 0;
        this.speed = 5;
        this.alturaJump = -15;
        this.gravidade = 0.8;

        this.noChao = false;;
        this.score = 0;
    }


    aplicarConfiguracoesDoNivel(nivel) {
        this.gravidade = nivel.gravidade;
        this.speed = nivel.speed;
        this.alturaJump = nivel.alturaJump;
    }

    atualizar(canvas) {
        this.velocidadeY += this.gravidade;                                         // Atualizar posição vertical
        this.y += this.velocidadeY;

        if (this.y + this.altura > canvas.height) {                              // nao cai do chao
            this.y = canvas.height - this.altura;
            this.velocidadeY = 0;
            this.noChao = true;
        }

        this.x += this.velocidadeX;                                                 // Atualizar posição horizontal

        if (this.x < 0) this.x = 0;
        if (this.x + this.largura > canvas.width) {
            this.x = canvas.width - this.largura;
        }
    }

    desenhar(ctx) {
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }

    saltar() {
        if (this.noChao) {
            this.velocidadeY = this.alturaJump;
            this.noChao = false;
        }
    }

    mover(direcao) {
        if (direcao === "esquerda") {
            this.velocidadeX = -this.speed;
        } else if (direcao === "direita") {
            this.velocidadeX = this.speed;
        }
    }

    parar() {
        this.velocidadeX = 0;
    }
}
