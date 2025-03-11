export function mostrarTelaTransicao(sucesso, callbackAvancar, callbackReiniciar) {
    // Cria a div da tela de transição
    const transicaoDiv = document.createElement("div");
    transicaoDiv.id = "transicaoTela";
    transicaoDiv.style.position = "fixed"; // Cobre toda a janela
    transicaoDiv.style.top = "0";
    transicaoDiv.style.left = "0";
    transicaoDiv.style.width = "100%";
    transicaoDiv.style.height = "100%";
    transicaoDiv.style.backgroundColor = "black"; // Fundo preto sólido
    transicaoDiv.style.display = "flex";
    transicaoDiv.style.alignItems = "center";
    transicaoDiv.style.justifyContent = "center";
    transicaoDiv.style.zIndex = "9999"; // Certifica-se de que está acima de tudo

    // Botão no centro
    const botao = document.createElement("button");
    botao.textContent = sucesso ? "Próximo Nível" : "Tentar Novamente"; // Texto dinâmico
    botao.style.padding = "15px 30px";
    botao.style.fontSize = "18px";
    botao.style.cursor = "pointer";
    botao.style.backgroundColor = "#4CAF50"; // Verde para o botão
    botao.style.color = "white";
    botao.style.border = "none";
    botao.style.borderRadius = "5px";

    // Evento de clique no botão
    botao.addEventListener("click", () => {
        document.body.removeChild(transicaoDiv); // Remove a tela de transição
        if (sucesso && callbackAvancar) {
            callbackAvancar(); // Avança para o próximo nível
        } else if (!sucesso && callbackReiniciar) {
            callbackReiniciar(); // Reinicia o nível atual
        }
    });

    transicaoDiv.appendChild(botao); // Adiciona o botão à tela
    document.body.appendChild(transicaoDiv); // Adiciona a tela ao body
}
