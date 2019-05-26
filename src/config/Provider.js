import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from '../modules/store';
import { PersistGate } from 'redux-persist/integration/react'
class AppStoreProvider extends PureComponent {

    render() {
      const { children } = this.props;
      const { store, persistor } = configureStore()
      console.log(store)
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      );
    }
}

export default AppStoreProvider;
