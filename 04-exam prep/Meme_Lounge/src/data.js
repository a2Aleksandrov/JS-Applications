import { del, get, post, put } from "./api.js";

export async function getAllMemes() {

    return await get('/data/memes?sortBy=_createdOn%20desc');
}
export async function createMeme(data) {

    return post('/data/memes', data);
}
export async function getMemeDetails(id) {

    return get('/data/memes/' + id);
}
export async function deleteMeme(id) {

    return del('/data/memes/' + id);
}
export async function editMeme(id, data) {

    return put('/data/memes/' + id, data);
}