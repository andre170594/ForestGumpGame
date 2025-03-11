export function mostrarTelaTransicao(sucesso, callbackAvancar, callbackReiniciar) {
    const transicaoDiv = document.createElement("div");
    transicaoDiv.id = "transicaoTela";
    transicaoDiv.style.position = "absolute";
    transicaoDiv.style.top = "0";
    transicaoDiv.style.left = "0";
    transicaoDiv.style.width = "100%";
    transicaoDiv.style.height = "100%";
    transicaoDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    transicaoDiv.style.color = "white";
    transicaoDiv.style.display = "flex";
    transicaoDiv.style.flexDirection = "column";
    transicaoDiv.style.alignItems = "center";
    transicaoDiv.style.justifyContent = "center";
    transicaoDiv.style.zIndex = "10";

    const mensagem = document.createElement("h1");
    mensagem.textContent = sucesso ? "Parabéns! Nível Concluído!" : "Que pena! Tente novamente.";
    transicaoDiv.appendChild(mensagem);

    const botao = document.createElement("button");
    botao.textContent = sucesso ? "Próximo Nível" : "Tentar Novamente";
    botao.style.padding = "10px 20px";
    botao.style.fontSize = "18px";
    botao.addEventListener("click", () => {
        document.body.removeChild(transicaoDiv);
        if (sucesso && callbackAvancar) {
            callbackAvancar();
        } else if (!sucesso && callbackReiniciar) {
            callbackReiniciar();
        }
    });

    transicaoDiv.appendChild(botao);
    document.body.appendChild(transicaoDiv);
}
