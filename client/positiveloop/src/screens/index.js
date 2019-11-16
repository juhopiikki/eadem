import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

function ReduxProvider(Component) {
  store = store || createStore({});

  return props => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}
