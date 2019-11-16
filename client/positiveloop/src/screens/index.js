import React from "react";
import { Navigation } from 'react-native-navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { test } from "../store/reducers";
import Test from './Test';
import Record from './Record';
import Loop from './Loop';

let store;
function ReduxProvider(Component) {
  store = store || createStore(test);

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
  Navigation.registerComponent('Me', () => ReduxProvider(Test), () => Test);
}
