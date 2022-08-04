import { myBooks } from '../data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const profileTemplate = (books) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    ${books.length == 0 ? html` <p class="no-books">No books in database!</p>` 
    : books.map(bookTemplate) }
       
</section>`;

const bookTemplate =(book) => html`
<ul class="my-books-list">
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <a class="button" href="/details/${book._id}">Details</a>
    </li>
    
</ul>`;

export async function myBooksPage(ctx) {
    const userData = getUserData();
    const books = await myBooks(userData.id);
    ctx.render(profileTemplate(books));
}