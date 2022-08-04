import { addLike, removeBook, showDetails, totalLikes, userLikes } from '../data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (book, isOwner, canLike, onDelete, likes, onLike) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            ${isOwner ? html`
            <a class="button" href="/edit/${book._id}">Edit</a>
            <a class="button" href="javascript:void(0)" @click=${onDelete}>Delete</a>` 
            : '' }
            ${canLike ? html`<a class="button" href="javascript:void(0)" @click=${onLike}>Like</a>` : ''}
           
            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;


export async function detailsPage(ctx) {
    const userData = getUserData();
    const book = await showDetails(ctx.params.id);

    let isOwner = false;
    let canLike = false;

    let likes = await totalLikes(ctx.params.id);
    let userIdLikes;
    if (userData) {
        
        userIdLikes = await userLikes(userData.id, ctx.params.id);
        if (userIdLikes == 0) {
            canLike = true;
        }
    }
    if (userData && userData.id == book._ownerId) {
        isOwner = true;
        canLike = false;
    }
    if (userData && userData.id != book._ownerId) {
        isOwner = false;
    }
   
    
    ctx.render(detailsTemplate(book, isOwner, canLike, onDelete, likes, onLike));

    async function onDelete() {
        if(confirm('Are you sure you want to rdelete this Book ?')) {

            await removeBook(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }
    async function onLike() {
        await addLike(ctx.params.id);
       userIdLikes = await userLikes(userData.id, ctx.params.id);
       likes = await totalLikes(ctx.params.id);
        if (userIdLikes > 0) {

            canLike = false;
        }
        ctx.render(detailsTemplate(book, isOwner, canLike, onDelete, likes, onLike));
    }
}