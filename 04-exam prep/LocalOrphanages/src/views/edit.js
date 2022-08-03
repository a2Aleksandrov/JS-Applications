import { getPostDetails } from '../data.js';
import { html } from '../lib.js';
import { put } from '../api.js';

const editTemplate = (onSubmit, postData) => html` 
<section id="edit-page" class="auth">
    <form id="edit" @submit=${onSubmit}>
        <h1 class="title">Edit Post</h1>

        <article class="input-group">
            <label for="title">Post Title</label>
            <input type="title" name="title" id="title" .value=${postData.title}>
        </article>

        <article class="input-group">
            <label for="description">Description of the needs </label>
            <input type="text" name="description" id="description" .value=${postData.description}>
        </article>

        <article class="input-group">
            <label for="imageUrl"> Needed materials image </label>
            <input type="text" name="imageUrl" id="imageUrl" .value=${postData.imageUrl}>
        </article>

        <article class="input-group">
            <label for="address">Address of the orphanage</label>
            <input type="text" name="address" id="address" .value=${postData.address}>
        </article>

        <article class="input-group">
            <label for="phone">Phone number of orphanage employee</label>
            <input type="text" name="phone" id="phone" .value=${postData.phone}>
        </article>

        <input type="submit" class="btn submit" value="Edit Post">
    </form>
</section>`

export async function editPage(ctx) {
    const postData = await getPostDetails(ctx.params.id);
    ctx.render(editTemplate(onSubmit, postData));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = {
            title: formData.get('title'),
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl'),
            address: formData.get('address'),
            phone: formData.get('phone')
        }
        if (data.title == '' || data.description == '' || data.imageUrl == '' || data.address == '' || data.phone == '') {
            return alert('All fields are required!');
        }
        await put('/data/posts/' + ctx.params.id, data);
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }


}