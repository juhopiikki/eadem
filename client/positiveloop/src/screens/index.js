import {Navigation} from 'react-native-navigation';
import { createStore } from 'redux'
import {Provider} from 'react-redux';
import React from "react";
import Test from './Test'
import {test} from "../store/reducers";

let store;
function ReduxProvider(Component) {
  store = store || createStore(test);

  return props => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}


export default () => {
    Navigation.registerComponent('Listen', () => ReduxProvider(Test), () => Test);
    Navigation.registerComponent('Record', () => ReduxProvider(Test), () => Test);
    Navigation.registerComponent('Saved', () => ReduxProvider(Test), () => Test);
    Navigation.registerComponent('Me', () => ReduxProvider(Test), () => Test);
}
