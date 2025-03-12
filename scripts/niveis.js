class Nivel {
    constructor(nome, fundo, objetos = [], objetivoFunc = () => false, gravidade,speed,alturaJump) {
        this.nome = nome;
        this.fundo = fundo;
        this.objetos = objetos;
        this.objetivoFunc = objetivoFunc;
        this.objetivoConcluido = false;
        this.contadorT = 0;


        this.gravidade = gravidade;
        this.speed = speed;
        this.alturaJump = alturaJump;
    }

    atualizar() {
        this.objetos.forEach((objeto) => objeto.atualizar?.());

        if (!this.objetivoConcluido) {
            this.objetivoConcluido = this.objetivoFunc(this);
        }
    }

    desenhar(ctx) {
        if (typeof this.fundo === "string") {
            ctx.fillStyle = this.fundo;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        } else if (this.fundo instanceof Image) {
            ctx.drawImage(this.fundo, 0, 0, ctx.canvas.width, ctx.canvas.height);
        }

        // Desenha os objetos no nível
        this.objetos.forEach((objeto) => objeto.desenhar?.(ctx));
    }

    reiniciarObjetivo() {
        this.objetivoConcluido = false;
        this.contadorT = 0;
    }

    incrementarContadorT() {
        this.contadorT++;
    }
}

const nivel1 = new Nivel(
    "Infância no Alabama",
    "#87CEEB",
    [],
    (nivel) => nivel.contadorT >= 3,
    0.5,
    5,
    -5
);

const nivel2 = new Nivel(
    "Futebol Americano",
    "#98FB98",
    [],
    (nivel) => nivel.contadorT >= 3,
    1.0,
    15,
    -18
);

const nivel3 = new Nivel(
    "Carreira Militar",
    "#FFD700",
    [],
    (nivel) => nivel.contadorT >= 3,
    0.7,
    5,
     -10
);

export { nivel1, nivel2, nivel3 };