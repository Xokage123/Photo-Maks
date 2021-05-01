const photos = (state = [], action) => {
    switch (action.type) {
        case "LOAD_PHOTOS":
            return [...state, ...action.photos];
        case "UPDATE_PHOTO":
            const newArray = state.map(element => {
                if (element.id === action.photo.id) {
                    return action.photo;
                } else {
                    return element;
                }
            });
            return newArray;
        default:
            return state;
    }
};

export default photos;