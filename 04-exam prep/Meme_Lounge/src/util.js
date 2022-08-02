export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}
export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}
export function removeUserData() {
    sessionStorage.removeItem('userData');
}

const notification = document.getElementById('errorBox');
const span = notification.querySelector('span');


export function notify(message) {

    span.textContent = message;
    notification.style.display = 'block';

    setTimeout(() => notification.style.display = 'none', 3000);
}