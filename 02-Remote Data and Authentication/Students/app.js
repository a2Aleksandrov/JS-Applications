async function getStudents() {

    const table = document.getElementById('results').querySelector('tbody');
    table.replaceChildren();
    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/students');
        if (response.ok == false) {
            throw new Error(response.json());
        }
        const data = await response.json();
        Object.values(data).forEach(stud => {

            const tr = document.createElement('tr');
            for (let key of Object.keys(stud)) {
                if (key != '_id') {
                    const th = document.createElement('th');
                    if (key == 'grade') {
                        th.textContent = `${Number(stud[key]).toFixed(2)}`;

                    } else {
                        th.textContent = `${stud[key]}`;
                    }
                    tr.appendChild(th);
                }
            }
            table.appendChild(tr);
        });

    } catch (error) {
        console.log(error.message);
    }
}
getStudents();
document.getElementById('form').addEventListener('submit', addStudent);

async function addStudent(event) {
    event.preventDefault()

    const formData = new FormData(event.target);
    let firstName = formData.get('firstName').trim();
    let lastName = formData.get('lastName').trim();
    let facultyNumber = formData.get('facultyNumber').trim();
    let grade = formData.get('grade').trim();
    if (firstName == '' || lastName == '' || facultyNumber == '' || grade == '') {
        return alert('All fields must be filled!')
    }
    try {

        const response1 = await fetch('http://localhost:3030/jsonstore/collections/students');
        const check = await response1.json();
        Object.values(check).forEach(stud => {

            if (stud.facultyNumber == facultyNumber) {
                throw new Error('Faculty number already exist!');
            }
        })
        let student = {
            firstName,
            lastName,
            facultyNumber,
            grade
        }
        const response2 = await fetch('http://localhost:3030/jsonstore/collections/students', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(student)

        });
        if (response2.ok == false) {
            let error = response2.json()
            throw new Error(error);
        }

    } catch (error) {
        alert(error.message);
    }
    let input = document.querySelector('.inputs').children;
    for (let field of input) {
        field.value = '';
    }
    getStudents();
}   