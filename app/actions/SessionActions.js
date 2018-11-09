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

export const changeActiveFamily = (type) => {
    return {
        type: 'CHANGE_ACTIVE_FAMILY',
        payload: type
    };
};

export const changeActiveCompany = (type) => {
    return {
        type: 'CHANGE_ACTIVE_COMPANY',
        payload: type
    };
};