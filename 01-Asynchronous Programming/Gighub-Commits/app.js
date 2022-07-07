async function loadCommits() {
    const userName = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const list = document.getElementById('commits');
    try {
        const response = await fetch(`https://api.github.com/repos/${userName}/${repo}/commits`);
        if (response.ok == false) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        for (let repo of data) {

            const li = document.createElement('li');
            li.textContent = `${repo.commit.author.name}: ${repo.commit.message}`;
            list.appendChild(li);
        }
    } catch (error) {
        const li = document.createElement('li');
        li.textContent = `Error: ${error.message} (Not Found)`;
        list.appendChild(li);

    }
}