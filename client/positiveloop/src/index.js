import {Navigation} from 'react-native-navigation';
import registerScreens from './screens'
import colors from './assets/colors'

function createScreenTree() {
    Navigation.events().registerAppLaunchedListener(() => {
        Navigation.setRoot({
            root: {
                bottomTabs: {
                    options: {
                        bottomTabs: {
                            titleDisplayMode: 'alwaysShow',
                        },
                    },
                    children: [{
                        stack: {
                            children: [{
                                component: {
                                    name: 'Listen',
                                }
                            }],
                            options: {
                                bottomTab: {
                                    icon: require('./assets/test.png'),
                                    text: 'Listen',
                                    testID: 'FIRST_TAB_BAR_BUTTON',
                                    iconColor: colors.inactiveTab,
                                    selectedIconColor: colors.activeTab,
                                }
                            }
                        }
                    },
                        {
                            stack: {
                                children: [{
                                    component: {
                                        name: 'Record',
                                    }
                                }],
                                options: {
                                    bottomTab: {
                                        icon: require('./assets/test.png'),
                                        text: 'Record',
                                        testID: 'FIRST_TAB_BAR_BUTTON',
                                        iconColor: colors.inactiveTab,
                                        selectedIconColor: colors.activeTab,
                                    }
                                }
                            }
                        }, {
                            stack: {
                                children: [{
                                    component: {
                                        name: 'Saved',
                                    }
                                }],
                                options: {
                                    bottomTab: {
                                        icon: require('./assets/test.png'),
                                        text: 'Saved',
                                        testID: 'FIRST_TAB_BAR_BUTTON',
                                        iconColor: colors.inactiveTab,
                                        selectedIconColor: colors.activeTab,
                                    }
                                }
                            }
                        }, {
                            stack: {
                                children: [{
                                    component: {
                                        name: 'Me',
                                    }
                                }],
                                options: {
                                    bottomTab: {
                                        icon: require('./assets/test.png'),
                                        text: 'Me',
                                        testID: 'FIRST_TAB_BAR_BUTTON',
                                        iconColor: colors.inactiveTab,
                                        selectedIconColor: colors.activeTab,
                                    }
                                }
                            }
                        },
                    ]
                }
            }
        });
    });
}

export function initializeApp () {
    registerScreens();
    createScreenTree();
}

