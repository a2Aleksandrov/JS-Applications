function attachEvents() {
    const textarea = document.getElementById('messages');
    const author = document.querySelector("input[name='author']").value;
    const content = document.querySelector("input[name='content']").value;

    const sendBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');

    sendBtn.addEventListener('click', onSend);


    async function onSend() {
        const msg = {
            author,
            content
        }
        try {

            const response = await fetch('http://localhost:3030/jsonstore/messenger', {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(msg)
            })

            if (response.ok == false) {
                const error = response.json();
                throw new Error(error);
            }
            const data = await response.json();


            const [user, message] = Object.values(data);

            textarea.textContent += `${user.trim()}:${message.trim()}`;


        } catch (error) {
            alert(error.message);
        }
        
    }

    refreshBtn.addEventListener('click', onRefresh);

    async function onRefresh() {
        textarea.textContent = '';
        const response = await fetch('http://localhost:3030/jsonstore/messenger')
        const data = await response.json();
        Object.values(data).forEach(msg => textarea.textContent += `${msg.author}: ${msg.content}\n`)
    }
}

attachEvents();