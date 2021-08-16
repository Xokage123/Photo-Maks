import { createApi } from 'unsplash-js';
import options from "../CONST"

export const unsplash = createApi({
    accessKey: options.access_key,
});

export async function unsplashGetPhoto(id) {
    const answer = await unsplash.photos.get({ photoId: id });
    const infoPhoto = await answer.response;
    return infoPhoto;
}


export async function unsplashGetListPhotos(page) {
    const answer = await unsplash.photos.list({ page: page });
    return answer.response.results;
}

export async function unsplashLikePhoto(id) {
    const answer = await fetch(`https://api.unsplash.com/photos/${id}/like`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
    });
    const infoPhoto = await answer.json();
    return infoPhoto;
}

export async function unsplashUnlikePhoto(id) {
    const answer = await fetch(`https://api.unsplash.com/photos/${id}/like`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
    });
    const infoPhoto = await answer.json();
    return infoPhoto;
}