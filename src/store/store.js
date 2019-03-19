import { createStore } from 'redux';

import rootReducer from '../reducers/RootReducer';


export default function setStore() {
  let store = createStore(rootReducer);
  return store;
}
