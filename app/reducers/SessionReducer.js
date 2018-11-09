const initialState = {
    activeScreen: 'login',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzU2Njc4OTEsImlzcyI6InBoYWxjb24tand0LWF1dGgiLCJlbWFpbCI6Im1heEBtY3Rla2suY29tIiwiaWF0IjoxNTM1NTgxNDkxfQ.YHK3BzDu59GxaoDk07Cr0yMa_ZoESPb6GSEOppmZgdQ',
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
