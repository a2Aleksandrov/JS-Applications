function loadRepos() {
    let textfield = document.getElementById('res');
    let result = [];
    fetch('https://api.github.com/users/testnakov/repos')
        .then(res => res.json())
        .then(data => textfield.textContent = JSON.stringify(data));
    
}   