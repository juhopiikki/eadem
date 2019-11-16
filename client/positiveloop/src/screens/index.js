import React from "react";
import { Navigation } from 'react-native-navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from '../store/store'

import Test from './Test';
import Record from './Record';
import Me from './Me';
import Loop from './Loop';

function ReduxProvider(Component) {
  return props => (
    <Provider store={store}>
      <PaperProvider>
        <Component {...props} />
      </PaperProvider>
    </Provider>
  );
}


export default () => {
  Navigation.registerComponent('Loop', () => ReduxProvider(Loop), () => Loop);
  Navigation.registerComponent('Record', () => ReduxProvider(Record), () => Record);
  Navigation.registerComponent('Saved', () => ReduxProvider(Test), () => Test);
  Navigation.registerComponent('Me', () => ReduxProvider(Me), () => Me);
}
