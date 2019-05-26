import * as actions from './actions';

const initialState = {
    userInfo: {},
    isLoading: false,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case actions.SUCCESS_GOOGLE_LOGIN:
        return { ...state, ...payload }

    case actions.FAILURE_LOGIN:
        return { ...state, ...payload }

    case actions.SUCCESS_FACEBOOK_LOGIN:
        return { ...state, ...payload }

    case actions.FAILURE_FACEBOOK_LOGIN:
        return { ...state, ...payload }

    case actions.SUCCESS_GOOGLE_LOGIN:
        return { ...state, ...payload }

    case actions.FAILURE_GOOGLE_LOGIN:
        return { ...state, ...payload }

    case actions.SUCCESS_GOOGLE_SIGN_OUT:
        return { ...state, ...payload }

    case actions.FAILURE_GOOGLE_SIGN_OUT:
        return { ...state, ...payload }

    case actions.SUCCESS_FACEBOOK_LOGIN:
        return { ...state, ...payload }

    default:
        return state
    }
}
