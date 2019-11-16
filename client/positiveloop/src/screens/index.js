import {Navigation} from 'react-native-navigation';
import { createStore } from 'redux'
import {Provider} from 'react-redux';
import App from "../../App";
import React from "react";
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
    Navigation.registerComponent('Listen', () => ReduxProvider(App), () => App);
    Navigation.registerComponent('Record', () => ReduxProvider(App), () => App);
    Navigation.registerComponent('Saved', () => ReduxProvider(App), () => App);
    Navigation.registerComponent('Me', () => ReduxProvider(App), () => App);
}
