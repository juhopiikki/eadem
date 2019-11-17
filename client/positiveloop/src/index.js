import {Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import UUIDGenerator from 'react-native-uuid-generator';
import registerScreens from './screens';
import colors from './assets/colors';
import {getMyRecords, getSavedRecords} from "./store/actions";
import store from './store/store'
import API from './utils/api'

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
    // const user = "d97b8baa-b626-4615-b162-fa6687887bfa"
    API.getUserById(
        user,
        (res) => {
            console.log('API:', res);
            if (res === null){
               // all bad :(
            } else if (res === false){
                // No user, create a new one.
                API.createUser({
                    "usersid":user
                }, (resUserId) => {
                    API.getUserById(resUserId, (resUser) => {
                        store.dispatch({type: 'SET_USER_NAME', payload: resUser.username})
                        store.dispatch({type: 'SET_USER_DESCRIPTION', payload: resUser.description})
                    })
                });
            } else {
                store.dispatch({type: 'SET_USER_NAME', payload: res.username})
                store.dispatch({type: 'SET_USER_DESCRIPTION', payload: res.description})
            }
        }
    );
    store.dispatch(getSavedRecords(user));
    store.dispatch(getMyRecords(user));
}

