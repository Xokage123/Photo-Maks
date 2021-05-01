// Экшен на подгрузку всех фото
export const loadPhotos = (photos) => {
    return {
        type: "LOAD_PHOTOS",
        photos,
    };
};
// Экшен на подгрузку определенного фото
export const getPhoto = (photo) => {
    return {
        type: "GET_PHOTO",
        photo,
    };
};
// Экшен на лайка фотографии
export const likePhoto = (likecount, checkLike) => {
    return {
        type: "LIKE_PHOTO",
        likecount,
        checkLike
    };
};
// Экшен на дизлайк фотографии
export const unlikePhoto = (likecount, checkLike) => {
    return {
        type: "UNLIKE_PHOTO",
        likecount,
        checkLike
    };
};
// Экшен на дизлайк фотографии
export const updateArrayPhoto = (photo) => {
    return {
        type: "UPDATE_PHOTO",
        photo
    };
};