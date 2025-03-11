export function mostrarTelaFinal(callbackMenu, callbackCreditos) {
    // Cria a div da tela final
    const finalDiv = document.createElement("div");
    finalDiv.id = "finalTela";
    finalDiv.style.position = "fixed";
    finalDiv.style.top = "0";
    finalDiv.style.left = "0";
    finalDiv.style.width = "100%";
    finalDiv.style.height = "100%";
    finalDiv.style.backgroundColor = "black";
    finalDiv.style.color = "white";
    finalDiv.style.display = "flex";
    finalDiv.style.flexDirection = "column";
    finalDiv.style.alignItems = "center";
    finalDiv.style.justifyContent = "center";
    finalDiv.style.zIndex = "9999";

    // Mensagem da tela final
    const mensagem = document.createElement("h1");
    mensagem.textContent = "Parabéns! Você concluiu o jogo!";
    mensagem.style.marginBottom = "30px";
    finalDiv.appendChild(mensagem);

    // Botão para voltar ao menu inicial
    const botaoMenu = document.createElement("button");
    botaoMenu.textContent = "Menu Inicial";
    botaoMenu.style.padding = "10px 20px";
    botaoMenu.style.fontSize = "18px";
    botaoMenu.style.cursor = "pointer";
    botaoMenu.style.backgroundColor = "#007BFF";
    botaoMenu.style.color = "white";
    botaoMenu.style.border = "none";
    botaoMenu.style.borderRadius = "5px";
    botaoMenu.style.margin = "10px";

    botaoMenu.addEventListener("click", () => {
        document.body.removeChild(finalDiv); // Remove a tela final
        if (callbackMenu) {
            callbackMenu(); // Chama o callback para voltar ao menu inicial
        }
    });
    finalDiv.appendChild(botaoMenu);

    // Botão para ver créditos
    const botaoCreditos = document.createElement("button");
    botaoCreditos.textContent = "Ver Créditos";
    botaoCreditos.style.padding = "10px 20px";
    botaoCreditos.style.fontSize = "18px";
    botaoCreditos.style.cursor = "pointer";
    botaoCreditos.style.backgroundColor = "#FF5733";
    botaoCreditos.style.color = "white";
    botaoCreditos.style.border = "none";
    botaoCreditos.style.borderRadius = "5px";
    botaoCreditos.style.margin = "10px";

    botaoCreditos.addEventListener("click", () => {
        document.body.removeChild(finalDiv); // Remove a tela final
        if (callbackCreditos) {
            callbackCreditos(); // Chama o callback para mostrar os créditos
        }
    });
    finalDiv.appendChild(botaoCreditos);

    document.body.appendChild(finalDiv); // Adiciona a tela ao body
}
