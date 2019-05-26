export const SUCCESS_LOGIN = 'SUCCESS_LOGIN'
export const FAILURE_LOGIN = 'FAILURE_LOGIN'

export const SUCCESS_GOOGLE_LOGIN = 'SUCCESS_GOOGLE_LOGIN'
export const FAILURE_GOOGLE_LOGIN = 'FAILURE_GOOGLE_LOGIN'

export const SUCCESS_FACEBOOK_LOGIN = 'SUCCESS_FACEBOOK_LOGIN'
export const FAILURE_FACEBOOK_LOGIN = 'FAILURE_FACEBOOK_LOGIN'

export const SIGN_OUT = 'SIGN_OUT';

export const SUCCESS_GOOGLE_SIGN_OUT = 'SUCCESS_GOOGLE_SIGN_OUT'
export const FAILURE_GOOGLE_SIGN_OUT = 'FAILURE_GOOGLE_SIGN_OUT'

export const LOADING_REQUEST = 'LOADING_REQUEST'

const successLogin = (userInfo) => ({
    type: SUCCESS_LOGIN,
    payload: userInfo
})

const failureLogin = (error) => ({
    type: FAILURE_LOGIN,
    payload: error
})

const successGoogleLogin = (userInfo) => ({
    type: SUCCESS_GOOGLE_LOGIN,
    payload: userInfo
})

const failureGoogleLogin = (error) => ({
    type: FAILURE_GOOGLE_LOGIN,
    payload: error
})

const successGoogleSignOut = () => ({
    type: SUCCESS_GOOGLE_SIGN_OUT,
})

const failureGoogleSignOut = () => ({
    type: FAILURE_GOOGLE_SIGN_OUT,
})

const logOut = () => ({
    type: SIGN_OUT,
})

const loadingRequest = (payload) => ({
    type: LOADING_REQUEST,
    payload
})
