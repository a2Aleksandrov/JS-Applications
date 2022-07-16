document.getElementById('logout').style.display = 'none'
document.getElementById('register-view').addEventListener('submit', register);
async function register(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');
    if (email == '' || password == '') {
        return alert('All fields are required!')
    }
    if (password != rePass) {
        return alert('Passwords are not the same!');
    }
    try {
        const response = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        });
        if (response.ok == false) {
            throw new Error(await response.json());
        }
        const data = await response.json();

        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('_ownerID', data._id);
        
    } catch (error) {
        alert(error.message);
    }

    window.location = './index.html';
}
