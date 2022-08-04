import { getAllBooks } from '../data.js';
import { html } from '../lib.js';

const catalogTemplate = (books) => html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    ${books.length == 0 ? html`<p class="no-books">No books in database!</p>` 
    : books.map(bookTemplate)}
      
</section>`;

const bookTemplate = (book) => html`
<ul class="other-books-list">
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>
</ul>`

export async function catalogPage(ctx) {

    const books = await getAllBooks();

    ctx.render(catalogTemplate(books));
}