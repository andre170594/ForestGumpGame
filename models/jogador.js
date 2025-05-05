export default class Jogador {
    constructor(x, y, largura, altura, cor) {

        // Posição e dimensões do jogador
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.cor = cor;

        this.vidas = 0;                 // Número de vidas

        // Variáveis relacionadas com o salto e a gravidade
        this.noChao = false;            // Indica se o jogador está no chão
        this.velocidadeY = 0;           // Velocidade vertical atual
        this.gravidade = 0;             // Intensidade da gravidade
        this.forcaSalto = 0;            // Força aplicada ao saltar
        this.yChao = 0;                 // Posição do chão

        // Animação | Correr | Saltar
        this.estado = "correr";         // Estado atual: "correr" ou "saltar"
        this.spritesCorrer = [];        // Imagens para a animação de corrida
        this.spriteSalto = [];          // Imagens para a animação de salto
        this.spriteAtual = 0;           // Índice do sprite atual a mostrar
        this.frameTimer = 0;            // Temporizador de frames (para trocar sprites)
        this.frameInterval = 100;       // Intervalo de tempo entre sprites (em ms)
    }


    updateVarsPerLevel(velocidadeY,gravidade,forcaSalto,yChao,vidas,spriteCorrida,spriteSalto) {
        // Define as variáveis do jogador com base no nível (como física e sprites)
        this.velocidadeY = velocidadeY;
        this.gravidade = gravidade;
        this.forcaSalto = forcaSalto;
        this.yChao = yChao;
        this.vidas = vidas;

        // Carrega imagens de corrida
        spriteCorrida.forEach(path => {
            const img = new Image();
            img.src = path;
            this.spritesCorrer.push(img);
        });

        // Carrega imagens de salto
        spriteSalto.forEach(path => {
            const img = new Image();
            img.src = path;
            this.spriteSalto.push(img);
        });
    }



    saltar() {
        // só pode saltar se estiver no chão
        if (this.noChao) {
            this.velocidadeY = -this.forcaSalto;
            this.noChao = false;
        }
    }

    atualizar() {
        // Define o estado com base na posição vertical
        if (!this.noChao) {
            this.estado = "saltar";
            this.frameInterval = 200;
        } else {
            this.estado = "correr";
            this.frameInterval = 100;
        }

        // Atualiza o temporizador de frames
        this.frameTimer += 4;
        if (this.frameTimer > this.frameInterval) {
            if (this.estado === "correr") {
                // Troca o sprite atual conforme o estado
                this.spriteAtual = (this.spriteAtual + 1) % this.spritesCorrer.length;
            } else {
                this.spriteAtual = (this.spriteAtual + 1) % this.spriteSalto.length;
            }
            this.frameTimer = 0;
        }

        // Aplica a física de gravidade e movimento vertical
        this.velocidadeY += this.gravidade;
        this.y += this.velocidadeY;

        // Verifica se o jogador tocou no chão
        if (this.y >= this.yChao) {
            this.y = this.yChao;
            this.velocidadeY = 0;
            this.noChao = true;
        }
    }

    desenhar(ctx) {
        let sprite;
        if (this.estado === "correr") {
            sprite = this.spritesCorrer[this.spriteAtual];
        } else {
            sprite = this.spriteSalto[this.spriteAtual];
        }

        if (sprite instanceof HTMLImageElement) {
            ctx.drawImage(sprite, this.x, this.y, this.largura, this.altura);
        } else {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x, this.y, this.largura, this.altura);
        }
    }

}
