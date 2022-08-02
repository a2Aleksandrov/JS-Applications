import { render, page } from './lib.js';
import { getUserData } from './util.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { catalogPage } from './views/memes.js';
import { registerPage } from './views/register.js';
import { logout } from './users.js'
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/profile.js';


const main = document.querySelector('main');

page(decorateContext);
page('/', homePage);
page('/memes', catalogPage);
page('/memes/:id', detailsPage);
page('/edit/:id', editPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/profile', profilePage);

updateNav();
page.start(); // start application

function rend(tempalte) {
    render(tempalte, main);
}

function decorateContext(ctx, next) {
    ctx.render = rend;
    ctx.updateNav = updateNav;
    next();
}

function updateNav() {
    const userData = getUserData();
    const userNav = document.querySelector('div .user');
    const guestNav = document.querySelector('div .guest');
    const span = userNav.querySelector('span');
    if (userData) {
        userNav.style.display = 'block';
        guestNav.style.display = 'none';
        span.textContent = `Welcome, ${userData.email}`;
    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'block';
    }
}

document.getElementById('logoutBtn').addEventListener('click', onLogout);

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}
