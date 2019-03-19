import { combineReducers } from 'redux';

import SessionReducer from './SessionReducer';

const rootReducer = combineReducers({
  session: SessionReducer
});

export default rootReducer;
