import { del, get, post, put } from "./api.js";
import { getUserData } from "./util.js";

export async function getAllPosts() {

    return await get('/data/posts?sortBy=_createdOn%20desc');
}

export async function createPost(data) {

    return await post('/data/posts', data);
}

export async function getPostDetails(id) {

    return await get('/data/posts/' + id);
}

export async function deletePost(id) {

    return await del('/data/posts/' + id);
}

export async function editPost(id) {

    return await put('/data/posts/' + id);
}

export async function getUserPosts() {
    const userData = getUserData();
    return await get(`/data/posts?where=_ownerId%3D%22${userData.id}%22&sortBy=_createdOn%20desc`);
}