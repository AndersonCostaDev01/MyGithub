document.addEventListener('DOMContentLoaded', function () {
    const usernameInput = document.querySelector('#username'); // Supondo que seja um campo de input
    const name = document.querySelector('#name');
    const avatar = document.querySelector('#avatar');
    const repos = document.querySelector('#repos');
    const followers = document.querySelector('#followers');
    const following = document.querySelector('#following');
    const link = document.querySelector('#link');
    const searchBtn = document.querySelector('#search-btn');
    const repo0 = document.querySelector('#repos0');
    const repo1 = document.querySelector('#repos1');
    const repo2 = document.querySelector('#repos2');
    

    searchBtn.addEventListener('click', function () {
        const usernameValue = usernameInput.value; // Pega o valor do campo de input

        if (!usernameValue) {
            alert('Nenhum usuário foi informado!!');
        } else {
            const api = `https://api.github.com/users/${usernameValue}`;
            
            fetch(api)
                .then(function (res) {
                    if (!res.ok) {
                        throw new Error(`Erro na requisição: ${res.status} - ${res.statusText}`);
                    } 
                    return res.json();
                })
                .then(function (json) {
                    if (json.public_repos === 0) {
                        alert('Esse usuário não tem repositórios públicos.');
                    } else {
                        // Preenche os campos com as informações do usuário
                        name.innerText = json.name;
                        avatar.src = json.avatar_url;
                        followers.innerText = json.followers;
                        following.innerText = json.following;
                        repos.innerText = json.public_repos;
                        link.href = json.html_url; // Define o link para o perfil do GitHub
                        console.log(json);

                        // Busca informações dos repositórios
                        return fetch(json.repos_url);
                    }
                })
                .then(function (repoRes) {
                    if (!repoRes.ok) {
                        throw new Error(`Erro ao buscar repositórios: ${repoRes.status}`);
                    }
                    return repoRes.json();
                })
                .then(function (reposData) {
                    console.log(reposData[0]);
                    repo0.innerText = reposData[0].name;
                    repo0.href = reposData[0].clone_url;
                    
                    repo1.innerText = reposData[1].name;
                    repo1.href = reposData[1].clone_url;

                    repo2.innerText = reposData[2].name;
                    repo2.href = reposData[2].clone_url;
                })
                .catch(function (error) {
                    console.error('Erro ao buscar os dados:', error);
                    alert('Ocorreu um erro ao buscar os dados. Verifique o nome de usuário e tente novamente.');
                });
        }
    });
});
