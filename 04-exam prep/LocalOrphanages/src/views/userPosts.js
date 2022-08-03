import { getUserPosts } from '../data.js';
import { html } from '../lib.js';


const userProfileTemplate = (userPosts) => html`
<section id="my-posts-page">
    <h1 class="title">My Posts</h1>

    <div class="my-posts">
        ${userPosts.length != 0 ? userPosts.map(userPostsTemplate) : ''}
    </div>
    ${userPosts.length == 0 ? html`<h1 class="title no-posts-title">You have no posts yet!</h1>` : ''}
</section>`;

const userPostsTemplate = (post) => html`
<div class="post">
    <h2 class="post-title">${post.title}</h2>
    <img class="post-image" src=${post.imageUrl} alt="Material Image">
    <div class="btn-wrapper">
        <a href="/details/${post._id}" class="details-btn btn">Details</a>
    </div>
</div>`;

export async function userPostsPage(ctx) {
    const userPosts = await getUserPosts();
    ctx.render(userProfileTemplate(userPosts));
    
}