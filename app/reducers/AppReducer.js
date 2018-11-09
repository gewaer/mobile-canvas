import { combineReducers } from "redux";

import SessionReducer from './SessionReducer';

const AppReducer = combineReducers({
    session: SessionReducer,
});

export default AppReducer;

