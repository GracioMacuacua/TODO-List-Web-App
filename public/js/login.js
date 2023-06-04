'use strict'

const errorMsg = document.querySelector('div');
const emailInput = document.querySelector('input[type="email"');
const senhaInput = document.querySelector('input[type="password"]');
const entrar = document.querySelector('input[type="submit"]');
const form = document.getElementsByTagName('form')[0];
const endpoint = 'http://localhost:3000/auth';

entrar.addEventListener('click', async (event) => {
    event.preventDefault();
    await efectuarLogin();
});

emailInput.addEventListener('click', () => {
    emailInput.style.borderColor = '#ffbd66';
});

emailInput.addEventListener('blur', () => {
    emailInput.style.borderColor = 'lightgray';
});

senhaInput.addEventListener('click', () => {
    senhaInput.style.borderColor = '#ffbd66';
});

senhaInput.addEventListener('blur', () => {
    senhaInput.style.borderColor = 'lightgray';
});

const efectuarLogin = async () => {
    const email = emailInput.value;
    const password = senhaInput.value;

    try {
        const { user, token } = await login(email, password);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        form.reset();

        return window.location.href = 'home.html';
    } catch (error) {

    }
}

const login = async (email, password) => {

    try {
        const user = { email, password }
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            const data = await response.json();
            const { token, user } = data;
            return { token, user };
        } else if (response.status == 404) {
            response
                .json()
                .then(e => {
                    errorMsg.innerText = e.message;
                    errorMsg.classList.toggle('active');
                })
        } else {
            throw new Error('Erro ao fazer login');
        }
    } catch (error) {
        console.error(`Ocorreu um erro: ${error}`);
    }
}