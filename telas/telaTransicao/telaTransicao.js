export function mostrarTelaTransicao(sucesso, callbackAvancar, callbackReiniciar) {
    // Carrega o conteúdo do arquivo HTML da tela de transição
    fetch('/telas/telaTransicao/telaTransicao.html')
        .then(response => response.text())
        .then(html => {
            // Adiciona o HTML carregado no DOM
            const container = document.createElement('div');
            container.innerHTML = html;
            const transicaoDiv = container.querySelector('#transicaoTela');

            // Configura o botão
            const botao = transicaoDiv.querySelector('.botaoTransicao');
            botao.textContent = sucesso ? "Próximo Nível" : "Tentar Novamente"; // Define o texto dinamicamente

            // Adiciona o evento de clique ao botão
            botao.addEventListener("click", () => {
                document.body.removeChild(transicaoDiv); // Remove a tela de transição
                if (sucesso && callbackAvancar) {
                    callbackAvancar(); // Avança para o próximo nível
                } else if (!sucesso && callbackReiniciar) {
                    callbackReiniciar(); // Reinicia o nível atual
                }
            });

            // Adiciona a tela ao body
            document.body.appendChild(transicaoDiv);
        })
        .catch(error => console.error("Erro ao carregar o HTML da tela de transição:", error));
}
