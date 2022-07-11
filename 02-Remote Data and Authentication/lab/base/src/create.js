document.querySelector('form').addEventListener('submit', onSubmit);

async function onSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const name = formData.get('name').trim();
    const img = formData.get('img').trim();
    const ingredients = formData.get('ingredients').trim().split('\n');
    const steps = formData.get('steps').trim().split('\n');

    const recipe = {
        name,
        img,
        ingredients,
        steps
    }
    const token = sessionStorage.getItem('accessToken');
    if (token == null) {
        alert ('You must be logged in to create new recipes! PLase log in!');
        window.location = '/lab/base/login.html';
        return;
    }
    try {
        const response = await fetch('http://localhost:3030/data/recipes', {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'X-Authorization': token

            },
            body: JSON.stringify(recipe)
        });
        if (response.ok == false) {
            let error = response.json();
            throw new Error(error);
        }
        window.location = '/lab/base/index.html';
    } catch (error) {
        alert(error.message);
    }
}