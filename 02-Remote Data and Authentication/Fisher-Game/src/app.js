const logoutBtn = document.getElementById('logout');
const loginBtn = document.getElementById('login');
const registerBtn = document.getElementById('register');
const user = document.querySelector('span');
const token = sessionStorage.getItem('accessToken');
const loadBtn = document.querySelector('.load');
const addBtn = document.querySelector('.add');
const form = document.querySelector('#addForm');
const divCatches = document.getElementById('catches');

if (token == null) {
    logoutBtn.style.display = 'none';
    loginBtn.style.display = 'inline-block';
    user.textContent = 'guest';
    addBtn.disabled = true;
    divCatches.style.display = 'none';
} else {
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    user.textContent = `${sessionStorage.getItem('email')}`;
    addBtn.disabled = false;
    divCatches.style.display = 'block';

}

logoutBtn.addEventListener('click', logout);
async function logout() {
    const resposne = await fetch('http://localhost:3030/users/logout', {
        headers: {
            'X-Authorization': token
        }
    });
    if (resposne.ok == false) {
        throw new Error(await resposne.json());
    }
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('_ownerID');

    window.location = './index.html';
}

document.querySelector('.load').addEventListener('click', load);
async function load() {
    divCatches.replaceChildren();
    try {
        const response = await fetch('http://localhost:3030/data/catches', {
            headers: {
                'X-Authorization': token
            }
        });
        if (response.ok == false) {
            throw new Error('You must be looged in!');
        }
        const data = await response.json();

        for (let obj of data) {
            const divCatch = document.createElement('div');
            divCatch.className = 'catch';
            divCatch.id = `${obj._ownerId}`;

            const labelAngler = document.createElement('label');
            labelAngler.textContent = 'Angler';
            divCatch.appendChild(labelAngler);

            const inputAngler = document.createElement('input');
            inputAngler.className = 'angler';
            inputAngler.type = 'text';
            inputAngler.value = obj.angler;
            divCatch.appendChild(inputAngler);


            const labelWeight = document.createElement('label');
            labelWeight.textContent = 'Weight';
            divCatch.appendChild(labelWeight);


            const inputWeight = document.createElement('input');
            inputWeight.className = 'weight';
            inputWeight.type = 'text';
            inputWeight.value = obj.weight;
            divCatch.appendChild(inputWeight);


            const labelSpecies = document.createElement('label');
            labelSpecies.textContent = 'Species';
            divCatch.appendChild(labelSpecies);


            const inputSpecies = document.createElement('input');
            inputSpecies.className = 'species';
            inputSpecies.type = 'text';
            inputSpecies.value = obj.species;
            divCatch.appendChild(inputSpecies);

            const labelBait = document.createElement('label');
            labelBait.textContent = 'Bait';
            divCatch.appendChild(labelBait);


            const inputBait = document.createElement('input');
            inputBait.className = 'bait';
            inputBait.type = 'text';
            inputBait.value = obj.bait;
            divCatch.appendChild(inputBait);

            const labelLocation = document.createElement('label');
            labelLocation.textContent = 'Location';
            divCatch.appendChild(labelLocation);

            const inputLocation = document.createElement('input');
            inputLocation.className = 'location';
            inputLocation.type = 'text';
            inputLocation.value = obj.location;
            divCatch.appendChild(inputLocation);

            const labelCapture = document.createElement('label');
            labelCapture.textContent = 'Capture Time';
            divCatch.appendChild(labelCapture);


            const inputCapture = document.createElement('input');
            inputCapture.className = 'captureTime';
            inputCapture.type = 'text';
            inputCapture.value = obj.captureTime;
            divCatch.appendChild(inputCapture);

            const updateBtn = document.createElement('button');
            updateBtn.textContent = 'Update';
            updateBtn.className = 'update';
            updateBtn.id = `${obj._id}`;
            divCatch.appendChild(updateBtn);

            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.className = 'delete';
            delBtn.id = `${obj._id}`;
            divCatch.appendChild(delBtn);

            divCatches.appendChild(divCatch);

            if (divCatch.id != sessionStorage._ownerID) {

                divCatch.disabled = true;
            }
        }
    } catch (error) {
        alert(error.message);
    }

}
form.addEventListener('submit', addCatch);

async function addCatch(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const angler = formData.get('angler');
    const weight = formData.get('weight');
    const species = formData.get('species');
    const bait = formData.get('bait');
    const location = formData.get('location');
    const captureTime = formData.get('captureTime');
    try {
        if (angler == '' || weight == '' || species == '' || bait == '' || location == '' || captureTime == '') {
            throw new Error('You cannot have empty fields!');
        }
        if (Number.isNaN(weight) || Number.isNaN(captureTime)) {
            throw new Error('Weight must be a number!');
        }
        const response = await fetch('http://localhost:3030/data/catches', {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({
                'angler': angler,
                'weight': Number(weight),
                "species": species,
                'bait': bait,
                'location': location,
                'captureTime': Number(captureTime),
            })
        });
        if (response.ok == false) {
            throw new Error('Login Required!');
        }
        else {
            load();
        }
    } catch (error) {
        alert(error.message);
    }
}

divCatches.addEventListener('click', async (ev) => {
    if (ev.target.textContent == 'Update') {
        try {
            const data = {
                'angler': `${ev.target.parentElement.querySelectorAll('input')[0].value}`,
                'weight': Number(`${ev.target.parentElement.querySelectorAll('input')[1].value}`),
                'species': `${ev.target.parentElement.querySelectorAll('input')[2].value}`,
                'bait': `${ev.target.parentElement.querySelectorAll('input')[3].value}`,
                'location': `${ev.target.parentElement.querySelectorAll('input')[4].value}`,
                'captureTime': Number(`${ev.target.parentElement.querySelectorAll('input')[5].value}`)
            }
            const response = await fetch(`http://localhost:3030/data/catches/${ev.target.id}`, {
                method: 'put',
                headers: {
                    'Content-type': 'application/json',
                    'X-Authorization': token
                },
                body: JSON.stringify(data)
            });
            if (response.ok == false) {
                throw new Error('Cannot change other user data!');
            } else {
                load()
            }
        } catch (error) {
            alert(error.message);
        }

    }
    if (ev.target.textContent == 'Delete') {
        try {
            const response = await fetch(`http://localhost:3030/data/catches/${ev.target.id}`, {
                method: 'delete',
                headers: {
                    'X-Authorization': token
                }
            })

            if (response.ok == false) {
                throw new Error('Cannot delete other user data!');
            } else {
                load();
            }
        } catch (error) {
            alert(error.message);
        }
    }
});