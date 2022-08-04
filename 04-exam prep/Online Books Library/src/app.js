import { render, page } from './lib.js';
import { logout } from './users.js';
import { getUserData } from './util.js';
import { addBookPage } from './views/add.js';
import { catalogPage } from './views/catalog.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { myBooksPage } from './views/myBooks.js';
import { registerPage } from './views/register.js';


const main = document.getElementById('site-content');


page(decorateContext);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/addBook', addBookPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/myBooks', myBooksPage);


updateNav();
page.start();

function rend(template) {
    render(template, main);
}

function decorateContext(ctx, next) {
    ctx.render = rend;
    ctx.updateNav = updateNav;
    next();
}

function updateNav() {
    const userData = getUserData();
    const userNav = document.getElementById('user');
    const guestNav = document.getElementById('guest');
    const msg = userNav.querySelector('span');
    if (userData) {
        userNav.style.display = 'block';
        guestNav.style.display = 'none';
        msg.textContent = `Welcome, ${userData.email}`;
    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'block';
    }
}
document.getElementById('logoutBtn').addEventListener('click', onLogout);

function onLogout() {
    logout();
    updateNav();
    page.redirect('/catalog');
}