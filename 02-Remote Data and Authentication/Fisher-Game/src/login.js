document.getElementById('logout').style.display = 'none';
document.getElementById('login-view').addEventListener('submit', login);

async function login(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    if (email == '') {
        return alert('Email is required!');
    }
    if (password == '') {
        return alert('Password is required!');
    }
    try {
    const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        if (response.ok == false) {
            throw new Error('Incorrect email or password!');
        }
        const data = await response.json();
        
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('_ownerID', data._id);
        
    } catch (error) {
        alert(error.message);
        return window.location = './login.html';
    }
    window.location = './index.html'
}   