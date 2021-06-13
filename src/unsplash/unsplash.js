export async function unsplashGetPhoto(id) {
    const answer = await fetch(`https://api.unsplash.com/photos/${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
    });
    const photo = answer.json();
    return photo;
}

export async function unsplashGetListPhotos(page) {
    const answer = await fetch(`https://api.unsplash.com/photos?page=${page}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
    })
    const photos = answer.json();
    return photos;
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