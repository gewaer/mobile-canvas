import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import createStore from '../modules/store';
let store;

class AppStoreProvider extends PureComponent {
    static childContextTypes = {
      store: PropTypes.shape({})
    };

    getChildContext() {
      return {
        store,
      };
    }

    render() {
      const { children } = this.props;
      store = store || createStore();
      console.log(store)
      return (
        <Provider store={store}>
          {children}
        </Provider>
      );
    }
}

export default AppStoreProvider;
