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
                name: 'Listen',
                passProps: {
                  text: 'This is tab 1'
                }
              }
            }],
            options: {
              bottomTab: {
                icon: require('./src/assets/test.png'),
                text: 'Listen',
                testID: 'FIRST_TAB_BAR_BUTTON'
              }
            }
          }
        },
          {
            stack: {
              children: [{
                component: {
                  name: 'Record',
                  passProps: {
                    text: 'This is tab 1'
                  }
                }
              }],
              options: {
                bottomTab: {
                  icon: require('./src/assets/test.png'),
                  text: 'Record',
                  testID: 'FIRST_TAB_BAR_BUTTON'
                }
              }
            }
          },{
            stack: {
              children: [{
                component: {
                  name: 'Saved',
                  passProps: {
                    text: 'This is tab 1'
                  }
                }
              }],
              options: {
                bottomTab: {
                  icon: require('./src/assets/test.png'),
                  text: 'Saved',
                  testID: 'FIRST_TAB_BAR_BUTTON'
                }
              }
            }
          },{
            stack: {
              children: [{
                component: {
                  name: 'Me',
                  passProps: {
                    text: 'This is tab 1'
                  }
                }
              }],
              options: {
                bottomTab: {
                  icon: require('./src/assets/test.png'),
                  text: 'Me',
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
