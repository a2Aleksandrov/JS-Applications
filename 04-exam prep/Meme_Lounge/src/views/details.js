import { deleteMeme, getMemeDetails } from '../data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (meme, isOwner, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title} </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${meme.description}
            </p>
            ${isOwner ? html`
            <a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button class="button danger" @click=${onDelete}>Delete</button>` 
            : ''}
        </div>
    </div>
</section>`

export async function detailsPage(ctx) {
    const userData = getUserData();
    const meme = await getMemeDetails(ctx.params.id);
     
    if (userData && userData.id == meme._ownerId) {
        ctx.render(detailsTemplate(meme, true, onDelete));
    } else {
        ctx.render(detailsTemplate(meme));  
    }
    async function onDelete() {
        if (confirm('Are you sure you want to delete this meme ?')) {
            await deleteMeme(ctx.params.id);
            ctx.page.redirect('/memes');
        }
    }
}