const initialState = {
    activeScreen: 'login',
    token: '',
    user: {},
    company: {}
};

const SessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_ACTIVE_SCREEN':
            return { ...state, activeScreen: action.payload.activeScreen };
            break;
        case 'CHANGE_USER':
            return { ...state, user: action.payload.user };
            break;
        case 'CHANGE_SESSION_TOKEN':
            return { ...state, token: action.payload.token };
            break;
        case 'CHANGE_ACTIVE_FAMILY':
            return { ...state, selectedCompanyId: action.payload.selectedCompanyId };
            break;
        case 'CHANGE_ACTIVE_COMPANY':
            return { ...state, company: action.payload.company };
            break;
        default:
            return state;
    }
};

export default SessionReducer;
