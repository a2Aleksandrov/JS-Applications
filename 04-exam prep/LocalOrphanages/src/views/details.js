import { deletePost, getPostDetails } from '../data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (post, isOwner, canDonate, onDelete, onDonate) => html`
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src=${post.imageUrl} alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${post.title}</h2>
                <p class="post-description">Description: ${post.description}</p>
                <p class="post-address">Address: ${post.address}</p>
                <p class="post-number">Phone number: ${post.phone}</p>
                <p class="donate-Item">Donate Materials: 0</p>
                <div class="btns">
                    ${isOwner ? html`
                    <a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                    <a href="javascript:void(0)" class="delete-btn btn" @click=${onDelete}>Delete</a>` 
                    : ''}                   
                    ${canDonate ? html`<a href="javascript:void(0)" class="donate-btn btn" @click=${onDonate}>Donate</a>`
                    : ''} 
                </div>

            </div>
        </div>
    </div>
</section>`

export async function detailsPage(ctx) {
    

    const post = await getPostDetails(ctx.params.id);
    const userData = getUserData();
    let isOwner = false;
    let canDonate = false;
    if (userData && userData.id == post._ownerId) {
        isOwner = true;
    }
    if (userData && userData.id != post._ownerId) {
        canDonate = true;
    }
    ctx.render(detailsTemplate(post, isOwner, canDonate, onDelete,));

    async function onDelete() {
        let isConfirmed = confirm('Are you sure you want to delete this post ?');
        if(isConfirmed) {
            await deletePost(ctx.params.id);
            ctx.page.redirect('/dashboard');
        }
    }
} 

