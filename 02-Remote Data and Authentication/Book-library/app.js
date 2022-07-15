const tbody = document.querySelector('tbody');
const url = 'http://localhost:3030/jsonstore/collections/books';

document.getElementById('loadBooks').addEventListener('click', load);

async function load() {
    tbody.replaceChildren();
    const response = await fetch(url);
    if (response.ok == false) {
        throw new Error(await response.json());
    }
    const data = await response.json();
    console.log(Object.keys(data));

    for (let key of Object.keys(data)) {
        console.log(data[key]);
        const tr = document.createElement('tr');
        tr.setAttribute('id', `${key}`);    
        const tdTitle = document.createElement('td');
        tdTitle.textContent = data[key].title;
        const tdAuthor = document.createElement('td');
        tdAuthor.textContent = data[key].author
        const tdBtns = document.createElement('td');
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        tdBtns.appendChild(editBtn);
        tdBtns.appendChild(delBtn);
        tr.appendChild(tdTitle);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdBtns);
        tbody.appendChild(tr);
    }
}
const form = document.querySelector('form');
form.addEventListener('submit', addBook);
async function addBook(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const title = formData.get('title');
    const author = formData.get('author');
    try {
        if (title == '' || author == '') {
            throw new Error('Please enter all fields!');
        }
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                author,
                title
            })
        });
        if (response.ok == false) {
            throw new Error(await response.json());
        }
        form.reset()
        load();
    } catch (error) {
        alert(error.message);
    }
}
let title = form.querySelector("input[name='title']");
title.value = '';
let author = form.querySelector("input[name='author']");
author.value = '';

tbody.addEventListener('click', change);
async function change(ev) {
    const bookID = ev.target.parentElement.parentElement.id;

    if (ev.target.textContent == 'Edit') {
        const h3 = form.querySelector('h3');
        h3.textContent = 'Edit FORM';
        const saveBtn = form.querySelector('button');
        saveBtn.textContent = 'Save';


        title.value = ev.target.parentElement.parentElement.children[0].textContent;
        author.value = ev.target.parentElement.parentElement.children[1].textContent;

        saveBtn.addEventListener('click', edit);
        async function edit(ev) {
            ev.preventDefault();

            const formData = new FormData(form);
            const titleName = formData.get('title');
            const authorName = formData.get('author');
            const response = await fetch(`${url}/${bookID}`, {
                method: 'put',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    'author': authorName,
                    'title': titleName,
                    '_id': bookID
                })

            });

            if (response.ok == false) {
                throw new Error(await response.json())
            }
            h3.textContent = 'FORM';
            saveBtn.textContent = 'Submit';
            form.reset();
            load();
            saveBtn.removeEventListener('click', edit);
        }

    }
    if (ev.target.textContent == 'Delete') {
        
        const response = await fetch(`${url}/${bookID}`, {
            method: 'delete',
            headers: {
                'Content-type': 'application/json'
            }
        });
        if (response.ok == false) {
            throw new Error(await response.json());
        }
        load();
    }
}