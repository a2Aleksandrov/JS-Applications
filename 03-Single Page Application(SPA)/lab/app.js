import { showAbout } from "./about.js";
import { showCatalog } from "./catalog.js";
import { showCreate } from "./create.js";
import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";
import { checkUserNav, onLogout } from "./util.js";

document.querySelector('nav').addEventListener('click', onNavigate);
document.getElementById('logoutBtn').addEventListener('click', onLogout);
checkUserNav()
showHome(); //start app

const section = {
    'homeBtn': showHome,
    'catalogBtn': showCatalog,
    'aboutBtn': showAbout,
    'loginBtn': showLogin,
    'registerBtn': showRegister,
    'createBtn': showCreate
}

function onNavigate(event) {
    if (event.target.tagName == 'A') {

        const view = section[event.target.id];
        if (typeof view == 'function') {
            event.preventDefault();
            view();
        }
    }
}

