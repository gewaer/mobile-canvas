import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppReducer from '../reducers/AppReducer';

let middleware = [thunk];

export default function configureStore(initialState) {
    return createStore(
        AppReducer,
        initialState,
        applyMiddleware(...middleware)
    );
}
