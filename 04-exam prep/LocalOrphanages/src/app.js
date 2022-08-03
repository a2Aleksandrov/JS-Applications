import { render, page } from './lib.js';
import { logout } from './users.js';
import { getUserData } from './util.js';
import { createPage } from './views/create.js';
import { dashboardPage } from './views/dashboard.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { userPostsPage } from './views/userPosts.js';

const main = document.getElementById('main-content');

page(decorateContext);
page('/', '/dashboard');
page('/dashboard', dashboardPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/myPosts', userPostsPage);



updateNav();
page.start(); // start application


function rend(template) {
    render(template, main);
}
function decorateContext(ctx, next) {
    ctx.render = rend;
    ctx.updateNav = updateNav;
    next();
}
function updateNav() {
    const userNav = document.getElementById('user');
    const guestNav = document.getElementById('guest');

    if (getUserData()) {
        userNav.style.display = 'block';
        guestNav.style.display = 'none';
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