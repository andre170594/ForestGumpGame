export default class Obstaculo {
    constructor(x, y, largura, altura, fundo, isVida = false) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.fundo = fundo;
        this.isVida = isVida;
        this.ultrapassado = false;
    }

    atualizar(velocidade) {
        this.x -= velocidade;
    }

    desenhar(ctx) {
        ctx.drawImage(this.fundo, this.x, this.y, this.largura, this.altura);
    }

    // GETS
    getIsVida(){
        return this.isVida;
    }
    getUltrapassado(){
        return this.ultrapassado;
    }
    getLargura(){
        return this.largura;
    }
    getX(){
        return this.x;
    }


    // SETS
    setUltrapassado(state){
        this.ultrapassado = state;
    }
}
