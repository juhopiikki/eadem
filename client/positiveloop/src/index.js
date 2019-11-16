import {Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import UUIDGenerator from 'react-native-uuid-generator';
import registerScreens from './screens';
import colors from './assets/colors';
import {getMyRecords, getSavedRecords} from "./store/actions";
import store from './store/store'

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
                                    name: 'Loop',
                                    options: {
                                        topBar: {
                                            visible: Platform.OS === 'ios',
                                            drawBehind: false,
                                            title: {
                                                text: 'Loop',
                                                fontWeight: 'bold',
                                            },
                                        },
                                    }
                                },

                            }],
                            options: {
                                bottomTab: {
                                    icon: require('./assets/test.png'),
                                    text: 'Loop',
                                    testID: 'FIRST_TAB_BAR_BUTTON',
                                    iconColor: colors.inactiveTab,
                                    selectedIconColor: colors.activeTab,
                                },
                            }
                        }
                    },
                        {
                            stack: {
                                children: [{
                                    component: {
                                        name: 'Record',
                                        options: {
                                            topBar: {
                                                visible: Platform.OS === 'ios',
                                                drawBehind: true,
                                                title: {
                                                    text: 'Record',
                                                    fontWeight: 'bold',
                                                },
                                            },
                                        }
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
                                        options: {
                                            topBar: {
                                                visible: Platform.OS === 'ios',
                                                drawBehind: true,
                                                title: {
                                                    text: 'Saved',
                                                    fontWeight: 'bold',
                                                },
                                            },
                                        }
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
                                        options: {
                                            topBar: {
                                                visible: Platform.OS === 'ios',
                                                drawBehind: true,
                                                title: {
                                                    text: 'Me',
                                                    fontWeight: 'bold',
                                                },
                                            },
                                        }
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

export const getUserKey = async () => {
    try {
        const existingUuid = await AsyncStorage.getItem(uuidKey);
        if (existingUuid !== null) {
            // User key exists
            console.log('User key!', existingUuid)
            return existingUuid;
        } else {
            // User key does not exist. Store a new one.
            try {
                const newUuid = await UUIDGenerator.getRandomUUID()
                await AsyncStorage.setItem(uuidKey, newUuid);
                console.log('Saved new user key!', newUuid)
                return newUuid;
            } catch (error) {
                // Error saving data
                console.log(error)
                return null;
            }
        }
    } catch (error) {
        // Error retrieving data
        console.log(error);
        return null;
    }
};

export async function initializeApp () {
    registerScreens();
    createScreenTree();
    const user = await getUserKey();
    store.dispatch(getSavedRecords(user));
    store.dispatch(getMyRecords(user));
}

