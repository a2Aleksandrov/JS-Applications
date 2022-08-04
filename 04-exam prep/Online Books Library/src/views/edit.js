import { get } from '../api.js';
import { updateBook } from '../data.js';
import { html } from '../lib.js';

const editTemplate = (onSubmit, book) => html`
<section id="edit-page" class="edit">
    <form id="edit-form" action="#" method="" @submit=${onSubmit}>
        <fieldset>
            <legend>Edit my Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" .value=${book.title}>
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description" id="description" .value=${book.description}></textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" .value=${book.imageUrl}>
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type" .value=${book.type}>
                        <option value="Fiction" selected>Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Save">
        </fieldset>
    </form>
</section>`;

export async function editPage(ctx) {
    const book = await get('/data/books/' + ctx.params.id);

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const bookInfo = {
            title: formData.get('title'),
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl'),
            type: formData.get('type')
        }
        if (bookInfo.title == '' || bookInfo.description == '' || bookInfo.imageUrl == '' || bookInfo.type == '') {
            return alert('All fields are required!');
        }
        await updateBook(ctx.params.id, bookInfo);
        ctx.page.redirect('/details/' + ctx.params.id);
    }
    ctx.render(editTemplate(onSubmit, book));
}