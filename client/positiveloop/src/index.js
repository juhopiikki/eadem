import {Navigation} from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import UUIDGenerator from 'react-native-uuid-generator';
import registerScreens from './screens';
import colors from './assets/colors';

const uuidKey = 'POSITIVELOOP_USER_KEY';

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
                                },
                                topBar: {
                                    visible: false,
                                    drawBehind: true,
                                },
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
                                    },
                                    topBar: {
                                        visible: false,
                                        drawBehind: true,
                                    },
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
                                    },
                                    topBar: {
                                        visible: false,
                                        drawBehind: true,
                                    },
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
                                    },
                                    topBar: {
                                        visible: false,
                                        drawBehind: true,
                                    },
                                }
                            }
                        },
                    ]
                }
            }
        });
    });
}

const getUserKey = async () => {
    try {
        const value = await AsyncStorage.getItem(uuidKey);
        if (value !== null) {
            // User key exists
            console.log('User key!', value)
        } else {
            // User key does not exist. Store a new one.
            try {
                const newUuid = await UUIDGenerator.getRandomUUID()
                await AsyncStorage.setItem(uuidKey, newUuid);
                console.log('Saved new user key!', newUuid)
            } catch (error) {
                // Error saving data
                console.log(error)
            }
        }
    } catch (error) {
        // Error retrieving data
        console.log(error);
    }
};

export async function initializeApp () {
    registerScreens();
    createScreenTree();
    await getUserKey();
}

