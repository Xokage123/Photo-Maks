const currentPhoto = (state = { links: {}, user: {}, urls: { small: "" } }, action) => {
    switch (action.type) {
        case "GET_PHOTO":
            return action.photo;
        case "LIKE_PHOTO":
            return {
                ...state,
                likes: action.likecount,
                liked_by_user: action.checkLike
            };
        case "UNLIKE_PHOTO":
            return {
                ...state,
                likes: action.likecount,
                liked_by_user: action.checkLike
            };
        default:
            return state;
    }
};

export default currentPhoto;