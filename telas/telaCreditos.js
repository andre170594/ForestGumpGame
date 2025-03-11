export function mostrarTelaCreditos(mostrarTelaInicial) {
    const creditosDiv = document.createElement("div");
    creditosDiv.id = "creditosTela";
    creditosDiv.style.position = "fixed";
    creditosDiv.style.top = "0";
    creditosDiv.style.left = "0";
    creditosDiv.style.width = "100%";
    creditosDiv.style.height = "100%";
    creditosDiv.style.backgroundColor = "black";
    creditosDiv.style.color = "white";
    creditosDiv.style.display = "flex";
    creditosDiv.style.flexDirection = "column";
    creditosDiv.style.alignItems = "center";
    creditosDiv.style.justifyContent = "center";
    creditosDiv.style.zIndex = "9999";

    // Mensagem dos créditos
    const mensagem = document.createElement("h1");
    mensagem.textContent = "Créditos do Jogo";
    creditosDiv.appendChild(mensagem);

    // Lista de créditos
    const lista = document.createElement("p");
    lista.textContent = "Desenvolvimento: Você\nDesign: Equipe Incrível\nApoio: Comunidade Fantástica";
    lista.style.marginTop = "20px";
    creditosDiv.appendChild(lista);

    // Botão para voltar ao menu inicial
    const botaoVoltar = document.createElement("button");
    botaoVoltar.textContent = "Menu Inicial";
    botaoVoltar.style.padding = "10px 20px";
    botaoVoltar.style.fontSize = "18px";
    botaoVoltar.style.cursor = "pointer";
    botaoVoltar.style.backgroundColor = "#007BFF";
    botaoVoltar.style.color = "white";
    botaoVoltar.style.border = "none";
    botaoVoltar.style.borderRadius = "5px";
    botaoVoltar.style.marginTop = "20px";

    botaoVoltar.addEventListener("click", () => {
        console.log("Voltando para o menu inicial...");
        document.body.removeChild(creditosDiv); // Remove a tela de créditos
        mostrarTelaInicial(() => {
            console.log("Jogo iniciado após a tela inicial");
            const canvas = document.getElementById("gameCanvas");
            canvas.style.display = "block"; // Mostra o canvas novamente
        });
    });

    creditosDiv.appendChild(botaoVoltar);
    document.body.appendChild(creditosDiv); // Adiciona a tela de créditos ao body
}
