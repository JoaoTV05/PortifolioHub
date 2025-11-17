/**
 * Script para buscar e exibir repositórios públicos do GitHub de um usuário.
 * * Este script faz uma requisição ao endpoint: 
 * https://api.github.com/users/JoaoTV05/repos
 */
async function fetchGithubRepos() {
    const username = "JoaoTV05";
    const apiURL = `https://api.github.com/users/${username}/repos`;
    // Referência ao contêiner no HTML onde os projetos serão exibidos
    const container = document.getElementById("projects-container"); 

    if (!container) {
        console.error("Erro: O elemento com id 'projects-container' não foi encontrado.");
        return;
    }

    // Define uma mensagem de carregamento inicial
    container.innerHTML = '<h2>Carregando Repositórios...</h2>';

    try {
        // 1. Faz a requisição usando fetch()
        const response = await fetch(apiURL);

        // 2. Trata erros de resposta HTTP (como 404, 500, etc.)
        if (!response.ok) {
            throw new Error(`Requisição falhou com status ${response.status}`);
        }

        // 3. Converte a resposta para JSON
        const repos = await response.json();

        // 4. Limpa o contêiner para inserir os resultados
        container.innerHTML = ''; 

        // 5. Itera sobre a lista de repositórios e cria os elementos HTML
        if (repos.length === 0) {
            container.innerHTML = `<p>O usuário ${username} não possui repositórios públicos.</p>`;
            return;
        }

        repos.forEach(repo => {
            // Cria o div que corresponde à classe CSS .project-card
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';

            const repoName = repo.name;
            const repoUrl = repo.html_url;
            // Usa 'Nenhuma descrição fornecida.' caso a descrição seja nula
            const repoDescription = repo.description || 'Nenhuma descrição fornecida.';

            projectCard.innerHTML = `
                <h3><a href="${repoUrl}" target="_blank">${repoName}</a></h3>
                <p>${repoDescription}</p>
                <p class="project-link">
                    <a href="${repoUrl}" target="_blank">Ver Repositório ↗</a>
                </p>
            `;

            container.appendChild(projectCard);
        });

    } catch (error) {
        // 6. Trata erros de rede ou os erros HTTP lançados
        console.error("Erro ao buscar repositórios do GitHub:", error);
        container.innerHTML = `
            <h2>⚠️ Erro ao Carregar Repositórios</h2>
            <p>Ocorreu um erro ao tentar buscar os dados. Detalhes: ${error.message}</p>
        `;
    }
}

// Chama a função para iniciar a busca assim que o script é carregado
fetchGithubRepos();