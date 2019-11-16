import {Navigation} from 'react-native-navigation';
import registerScreens from './src/screens'

registerScreens()

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [{
          stack: {
            children: [{
              component: {
                name: 'TestScreen',
                passProps: {
                  text: 'This is tab 1'
                }
              }
            }],
            options: {
              bottomTab: {
                icon: require('./src/assets/test.png'),
                text: 'Tab 1',
                testID: 'FIRST_TAB_BAR_BUTTON'
              }
            }
          }
        },
          {
            stack: {
              children: [{
                component: {
                  name: 'TestScreen',
                  passProps: {
                    text: 'This is tab 1'
                  }
                }
              }],
              options: {
                bottomTab: {
                  icon: require('./src/assets/test.png'),
                  text: 'Tab 1',
                  testID: 'FIRST_TAB_BAR_BUTTON'
                }
              }
            }
          },
          ]
      }
    }
  });
});
