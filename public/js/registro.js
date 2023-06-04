const nome = document.getElementById('in-nome');
const apelido = document.getElementById('in-apelido');
const email = document.getElementById('in-email');
const senha = document.getElementById('in-senha');
const confirmaSenha = document.getElementById('in-confirma-senha');
const nivelAcesso = document.getElementById('nivel-acesso');
const cadastrar = document.querySelector('input[type="submit"]');
const cancelar = document.querySelector('input[type="button"]');
const form = document.getElementsByTagName('form')[0];
const endpoint = 'http://localhost:3000/user/r';


cadastrar.addEventListener('click', async (event) => {
    event.preventDefault();
    await efectuarCadastro();
});

cancelar.addEventListener('click', (event) => {
    form.reset()
    return window.location.href = 'index.html'
});

const efectuarCadastro = async () => {
    const nomeR = nome.value + ' ' + apelido.value;
    const emailR = email.value;
    const senhaR = senha.value;
    const nivelAcessoR = nivelAcesso.value;

    try {
        registar(nomeR, emailR, senhaR, nivelAcessoR)
            .then(response => {
                form.reset();
                return window.location.href = 'index.html';
            })
            .catch(error => {
                alert('Ocorreu um erro ao cadastrar os dados.\nTente novamente!');
            })
    } catch (error) {
        console.log('Erro ao efectuar cadastro: ', error);
    }

}

const registar = async (name, email, password, access) => {

    try {
        const user = { name, email, password, access }
        console.log(user);
        const dados = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            
        if (dados.ok) {
            console.log('Dados enviados com sucesso')
        } else {
            throw new Error("Erro ao cadastrar")
        }
    } catch (error) {
        throw error
    }
}