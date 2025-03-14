export function mostrarTelaCreditos(callbackMenu) {
    fetch('/telas/telaCreditos/telaCreditos.html')
        .then(response => response.text())
        .then(html => {
            // Adiciona o HTML carregado no DOM
            const container = document.createElement('div');
            container.innerHTML = html;
            const creditosDiv = container.querySelector('#creditosTela');

            // Configura o botão de voltar
            const botaoMenu = creditosDiv.querySelector('.botaoVoltar');
            botaoMenu.addEventListener("click", () => {
                document.body.removeChild(creditosDiv); // Remove a tela de créditos
                if (callbackMenu) {
                    callbackMenu(); // Callback para o menu inicial
                }
            });

            // Adiciona a tela ao body
            document.body.appendChild(creditosDiv);
        })
        .catch(error => console.error("Erro ao carregar o HTML da tela de créditos:", error));
}
