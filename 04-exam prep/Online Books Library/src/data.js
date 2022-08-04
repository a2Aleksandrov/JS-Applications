import { del, get, post, put } from "./api.js";


export function getAllBooks() {

    return get('/data/books?sortBy=_createdOn%20desc');
}

export function addBook(book) {

    return post('/data/books', book);
}

export function showDetails(bookId) {

    return get('/data/books/' + bookId);
}

export function updateBook(bookId, book) {

    return put('/data/books/' + bookId, book);
}

export function removeBook(bookId) {

    return del('/data/books/' + bookId);
}

export function myBooks(userId) {

    return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export function addLike(bookId) {
    const like = { bookId };
    return post('/data/likes', like);
}

export function totalLikes(bookId) {

    return get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}

export function userLikes(userId, bookId) {

    return get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}