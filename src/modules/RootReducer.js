import { combineReducers } from 'redux';

import SessionReducer from './Session';

const rootReducer = combineReducers({
  session: SessionReducer
});

export default rootReducer;
