import { getUserData, removeUserData } from "./util.js";

const host = 'http://localhost:3030';

async function requests(method, url, data) {
    const options = {
        method,
        headers: {}
    }
    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    const userData = getUserData();
    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }
    try {
        const res = await fetch(host + url, options);
        if (res.ok == false) {
            if (res.status == 403) {
                removeUserData();
            }
            const error = await res.json();
            throw new Error(error.message);
        }
        if (res.status == 204) {
            return res;
        } else {
            return res.json();
        }

    } catch (error) {
        alert(error.message);
        throw error;
    }
}

export async function get(url) {
    return requests('get', url);
}

export async function post(url, data) {
    return requests('post', url, data);
}

export async function put(url, data) {
    return requests('put', url, data);
}

export async function del(url) {
    return requests('delete', url);
}