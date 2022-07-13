function attachEvents() {

    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');
    const phonebook = document.getElementById('phonebook');

    loadBtn.addEventListener('click', load);
    async function load() {
        try {
            const response = await fetch('http://localhost:3030/jsonstore/phonebook')
            if (response.ok == false) {
                let error = response.json();
                throw new Error(error);
            }
            const data = await response.json();
            

            phonebook.replaceChildren();
            Object.values(data).forEach(obj => {
                
                const li = document.createElement('li');
                li.textContent = `${obj.person}:${obj.phone}`;
                const delBtn = document.createElement('button');
                delBtn.setAttribute('id', obj._id)
                delBtn.textContent = 'Delete';
                li.appendChild(delBtn);
                phonebook.appendChild(li);
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    let person = document.getElementById('person');
    let phone = document.getElementById('phone');

    createBtn.addEventListener('click', create);
    async function create() {
        if (person.value == '' || phone.value == '') {
            return alert('fields Cannot be empty!');
            
        }
        try {
            const response = await fetch('http://localhost:3030/jsonstore/phonebook', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    'person': person.value.trim(),
                    'phone': phone.value.trim()
                })
            });
            if (response.ok == false) {
                let error = await response.json();
                throw new Error(error);
            }
            phone.value = '';
            person.value = '';

        } catch (error) {
            console.log(error.message);
        }
        load()
    }
    phonebook.addEventListener('click', del);
    async function del(event) {
        if (event.target.textContent == 'Delete') {
            try {

                const response = await fetch(`http://localhost:3030/jsonstore/phonebook/${event.target.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json'
                    }

                });
                if (response.ok == false) {
                    const error = response.json();
                    throw new Error(error);
                }
                load()
                return await response.json();
            } catch (error) {
                console.log(error.message);
            }
        }
    }
}
attachEvents();