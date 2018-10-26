//Instruments
import {MAIN_URL, TOKEN} from '../config';

export default new class Api {
    async fetchPosts (page) {
        const response = await fetch(`${MAIN_URL}?sise=60&page=${page}`, {
            method: 'GET',
        });

        if (response.status !== 200) {
            throw new Error('Posts were not loaded.');
        }
        const  { data: posts } = await response.json();

        return posts;
    }

    async createPost(comment) {
        const response = await fetch(MAIN_URL, {
            method:  'POST',
            headers: {
                authorization:  TOKEN,
                'content-type': 'application/json',
            },
            body: JSON.stringify({comment}),
        });

        if (response.status !== 200) {
            throw new Error('Post were not created.');
        }
        const {data: post } = await response.json();

        return post;
    }

    async removePost(id) { // ф-я удаляет мои комменты
        const response = await fetch(`${ MAIN_URL }/${ id }`, {
            method:  'DELETE',
            headers: {
                authorization:  TOKEN,
                'content-type': 'application/json',
            },
        });

        if (response.status !== 204) {
            throw new Error('Delete were not deleted.');
        }
        // const {data: post } = await response.json();

        return true;
    }
    async likePost(id) { //
        const response = await fetch(`${ MAIN_URL }/${ id }`, {
            method:  'PUT',
            headers: {
                authorization:  TOKEN,
                'content-type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error('Post dont liked');
        }
        const {data: likedPost } = await response.json();

        return likedPost; //если все ок,  возвращается новый пост
    }

}();

