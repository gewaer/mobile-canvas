export const changeActiveScreen = (type) => {
    return {
        type: 'CHANGE_ACTIVE_SCREEN',
        payload: type
    };
};

export const changeUser = (type) => {
    return {
        type: 'CHANGE_USER',
        payload: type
    };
};

export const changeSessionToken = (type) => {
    return {
        type: 'CHANGE_SESSION_TOKEN',
        payload: type
    };
};

export const changeCurrentCondo = (type) => {
    return {
        type: 'CHANGE_CURRENT_CONDO',
        payload: type
    };
};

export const changeCondos = (type) => {
    return {
        type: 'CHANGE_CONDOS',
        payload: type
    };
};

export const changeIsAdmin = (type) => {
    return {
        type: 'CHANGE_IS_ADMIN',
        payload: type
    };
};

export const changePosts = (type) => {
    return {
        type: 'CHANGE_POSTS',
        payload: type
    };
};