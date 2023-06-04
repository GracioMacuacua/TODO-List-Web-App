const criarTarefa = document.getElementsByClassName('create-task')[0];
const ul = document.getElementsByTagName('ul')[0];
const li = document.getElementsByTagName('li');
const sair = document.getElementsByClassName('button')[0];
const categoria = document.getElementById('categoria');
const modal = document.getElementsByClassName('modal-container')[0];
const categoriaIn = document.getElementById('in-categoria')
const dataCriacaoIn = document.getElementById('in-data-criacao');
const actorIn = document.getElementById('in-actor');
const form = document.querySelector('.modal form');
const btnClose = document.querySelector('.modal p > span');
const endpoint = 'http://localhost:3000/tasks';

criarTarefa.addEventListener('click', () => {
    modal.classList.toggle('modal-show');
    getUsers();
});

ul.addEventListener('click', (event) => {
    handleMenu(event.target);
});

sair.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
});

categoria.addEventListener("change", async () => {
    var opcao = categoria.value;
    handleCategory(opcao);
});

dataCriacaoIn.value = new Date().toISOString().split("T")[0];

form.addEventListener('submit', (event) => {
    event.preventDefault();
    createTask();
});

form.addEventListener('reset', () => {
    dataCriacaoIn.value = new Date().toISOString().split("T")[0];
});

btnClose.addEventListener('click', () => {
    modal.classList.toggle('modal-show');
});

const handleMenu = (menuItem) => {
    switch (menuItem) {
        case li[0]:
            check(null);
            break;
        case li[1]:
            check(li[1].innerText);
            break;
        case li[2]:
            check(li[2].innerText);
            break;
        case li[3]:
            window.location.href = 'edit.html';
            break;
        default:
            break;
    }
}

const check = async (key) => {
    var response;
    const conf = {
        method: 'GET',
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    };
    if (key) {
        response = await fetch(endpoint + `/status/${key.substr(0, key.length - 1)}`, conf);
    } else
        response = await fetch(endpoint, conf);

    if (response.ok) {
        response.json()
            .then(data => {
                fillTable(data);
            });
    } else if (response.status == 401) {
        window.location.href = 'index.html';
    }
}

const handleCategory = async (key) => {
    var response;
    const conf = {
        method: 'GET',
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    };

    if (key)
        response = await fetch(endpoint + `/category/${key}`, conf);
    else
        response = await fetch(endpoint, conf);

    if (response.ok) {
        response.json()
            .then(data => {
                fillTable(data)
            });
    } else if (response.status == 401) {
        window.location.href = 'index.html';
    }
}

function fillTable(data) {
    const tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = null;
    for (var i = 0; i < data.length; i++) {
        const tr = document.createElement('tr');
        var task = '';
        task += `<td>${data[i].name}</td>`;
        task += `<td>${data[i].description}</td>`;
        task += `<td>${data[i].createdAt}</td>`;
        task += `<td>${data[i].expiresAt}</td>`;
        task += `<td>${localStorage.getItem(data[i].actor_Id)}</td>`;
        task += `<td><span class="status ${data[i].status.toLowerCase()}">${data[i].status}</span></td>`;
        tr.innerHTML = task;
        tbody.appendChild(tr);
    }
}

const createTask = async () => {
    const nomeIn = document.getElementById('in-nome');
    const descricaoIn = document.getElementById('in-descricao');
    const dataVencimentoIn = document.getElementById('in-data-vencimento');

    const task = {
        name: nomeIn.value,
        description: descricaoIn.value,
        category: categoriaIn.value,
        createdAt: dataCriacaoIn.value,
        expiresAt: dataVencimentoIn.value,
        actor_Id: actorIn.value
    }

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify(task)
    })
        .then(s => {
            if (s.status == 201) {
                s.json().then(m => { alert(m.message) });
                modal.classList.toggle('modal-show');
            } else
                alert('Ocorreu um erro ao efectuar o registro!')
        }).catch(e => {
            alert('Ocorreu um erro ao efectuar o registro!')
        })
}

function getUsers() {
    fetch('http://localhost:3000/user', {
        method: "GET",
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
        .then(res => {
            res.json()
                .then(data => {
                    actorIn.innerHTML = null
                    actorIn.innerHTML = '<option value="">Selecione um actor</option>'
                    for (var i = 0; i < data.length; i++) {
                        var option = document.createElement('option');
                        option.value = data[i].id;
                        option.textContent = data[i].name;
                        actorIn.appendChild(option);
                        localStorage.setItem(data[i].id, data[i].name);
                    }
                });
        }).catch(error => {
            alert(error)
        })
}