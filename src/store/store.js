import { createStore } from 'redux';

import rootReducer from '../reducers/RootReducer';

const store = createStore(rootReducer);

export default function setStore() {
  
  return store;
}
