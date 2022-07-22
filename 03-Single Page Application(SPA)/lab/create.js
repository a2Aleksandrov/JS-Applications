import { showCatalog } from "./catalog.js";


const section = document.getElementById('createView');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
section.remove();

export function showCreate() {
    document.querySelector('main').replaceChildren(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    try {   
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        const res = await fetch('http://localhost:3030/data/movies', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-authorization': userData.accessToken
            },
            body: JSON.stringify({ title })

        });
        if (res.ok == false) {
            const error = await res.json();
            throw Error(error.message);
        }
        showCatalog();
    } catch (err) {
        alert(err.message);
    }
}
