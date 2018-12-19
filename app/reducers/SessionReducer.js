const initialState = {
    activeScreen: 'login',
    token: '',
    user: {},
    condos: [],
    currentCondo: {}
};

const SessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_ACTIVE_SCREEN':
            return { ...state, activeScreen: action.payload.activeScreen };
        case 'CHANGE_USER':
            return { ...state, user: action.payload.user };
        case 'CHANGE_SESSION_TOKEN':
            return { ...state, token: action.payload.token };
        case 'CHANGE_CURRENT_CONDO':
            return { ...state, currentCondo: action.payload.currentCondo };
        case 'CHANGE_CONDOS':
            return { ...state, condos: action.payload.condos };
        default:
            return state;
    }
};

export default SessionReducer;
