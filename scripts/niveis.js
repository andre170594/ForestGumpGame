class Nivel {
    constructor(nome, fundo, objetos = [], objetivoFunc = () => false) {
        this.nome = nome;
        this.fundo = fundo;
        this.objetos = Array.isArray(objetos) ? objetos : [];
        this.objetivoFunc = objetivoFunc;
        this.objetivoConcluido = false;
        this.contadorT = 0;
    }

    atualizar() {
        this.objetos.forEach((objeto) => objeto.atualizar?.());

        if (!this.objetivoConcluido) {
            this.objetivoConcluido = this.objetivoFunc(this.contadorT);
        }
    }

    desenhar(ctx) {
        if (typeof this.fundo === "string") {
            ctx.fillStyle = this.fundo;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        } else if (this.fundo instanceof Image) {
            ctx.drawImage(this.fundo, 0, 0, ctx.canvas.width, ctx.canvas.height);
        }

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

// Definição dos níveis
const nivel1 = new Nivel(
    "Infância no Alabama",
    "#87CEEB",
    [],
    (contadorT) => contadorT >= 3
);

const nivel2 = new Nivel(
    "Futebol Americano",
    "#98FB98",
    [],
    (contadorT) => contadorT >= 3
);

const nivel3 = new Nivel(
    "Carreira Militar",
    "#FFD700",
    [],
    (contadorT) => contadorT >= 3
);

export { Nivel, nivel1, nivel2, nivel3 };
