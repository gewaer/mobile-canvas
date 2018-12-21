import React from 'react'; // eslint-disable-line
import { Navigation } from 'react-native-navigation';
import { changeActiveScreen } from './app/actions/SessionActions';
import { colors } from "./app/config/styles";

import getStore from "./app/store/getStore"

const store = getStore();
var currentRoot = '';

onStoreUpdate = () => {
    var  root  = store.getState().session.activeScreen;

    if (currentRoot != root) {
        currentRoot = root;
        startApp(root);
    }
}

startApp = (root) => {
    switch (root) {
        case 'login':
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'vv.Login', // unique ID registered with Navigation.registerScreen
                    navigatorStyle: {
                        navBarHidden: true,
                    },
                },
            });
            return;
        case 'forgotPassword':
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'vv.ForgotPassword', // unique ID registered with Navigation.registerScreen
                navigatorStyle: {
                    navBarHidden: true,
                },
            },
        });
            return;
        case 'condominiums':
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'vv.Condominiums', // unique ID registered with Navigation.registerScreen
                navigatorStyle: {
                    navBarHidden: true,
                },
            },
        });
            return;
        case 'reports':
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'vv.Reports', // unique ID registered with Navigation.registerScreen
                navigatorStyle: {
                    navBarHidden: true,
                },
            },
            drawer: {
                left: {
                    screen: 'dac.SideMenu',
                },
                style: {
                    drawerShadow: false,
                    contentOverlayColor: 'rgba(0,0,0,0.25)',
                    leftDrawerWidth: 75,
                    rightDrawerWidth: 30,
                    shouldStretchDrawer: false
                },
            }
        });
            return;
        case 'welcome':
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'dac.Welcome', // unique ID registered with Navigation.registerScreen
                    navigatorStyle: {
                        navBarHidden: true,
                    },
                },
            });
            return;
        
        case 'dashboard':
            Navigation.startTabBasedApp({
                tabs: [{
                    screen: 'vv.Home', // unique ID registered with Navigation.registerScreen
                    icon: require('./app/assets/images/icons/home.png'), // local image asset for the tab icon unselected state (optional on iOS)
                    iconInsets: { // add this to change icon position (optional, iOS only).
                        top: 6, // optional, default is 0.
                        left: 0, // optional, default is 0.
                        bottom: -6, // optional, default is 0.
                        right: 0 // optional, default is 0.
                    },
                    navigatorStyle: {
                        navBarBackgroundColor: '#551A8B',
                        navBarComponentAlignment: 'center',
                        statusBarTextColorScheme: 'light',
                        navBarHidden: true,
                    }, // override the navigator style for the tab screen, see "Styling the navigator" below (optional),
                    navigatorButtons: {} // override the nav buttons for the tab screen, see "Adding buttons to the navigator" below (optional)
                },
                {
                    screen: 'vv.AddPost', // unique ID registered with Navigation.registerScreen
                    icon: require('./app/assets/images/icons/post.png'), // local image asset for the tab icon unselected state (optional on iOS)
                    iconInsets: { // add this to change icon position (optional, iOS only).
                        top: 6, // optional, default is 0.
                        left: 0, // optional, default is 0.
                        bottom: -6, // optional, default is 0.
                        right: 0 // optional, default is 0.
                    },
                    navigatorStyle: {
                        navBarBackgroundColor: '#551A8B',
                        navBarComponentAlignment: 'center',
                        statusBarTextColorScheme: 'light',
                        navBarHidden: true,
                    }, // override the navigator style for the tab screen, see "Styling the navigator" below (optional),
                    navigatorButtons: {} // override the nav buttons for the tab screen, see "Adding buttons to the navigator" below (optional)
                },
                {
                    screen: 'dac.Companies', // unique ID registered with Navigation.registerScreen
                    icon: require('./app/assets/images/icons/bills.png'), // local image asset for the tab icon unselected state (optional on iOS)
                    iconInsets: { // add this to change icon position (optional, iOS only).
                        top: 6, // optional, default is 0.
                        left: 0, // optional, default is 0.
                        bottom: -6, // optional, default is 0.
                        right: 0 // optional, default is 0.
                    },
                    navigatorStyle: {
                        navBarBackgroundColor: '#551A8B',
                        navBarComponentAlignment: 'center',
                        statusBarTextColorScheme: 'light',
                        navBarHidden: true,
                    }, // override the navigator style for the tab screen, see "Styling the navigator" below (optional),
                    navigatorButtons: {} // override the nav buttons for the tab screen, see "Adding buttons to the navigator" below (optional)
                },
                {
                    screen: 'dac.Companies', // unique ID registered with Navigation.registerScreen
                    icon: require('./app/assets/images/icons/notifications.png'), // local image asset for the tab icon unselected state (optional on iOS)
                    iconInsets: { // add this to change icon position (optional, iOS only).
                        top: 6, // optional, default is 0.
                        left: 0, // optional, default is 0.
                        bottom: -6, // optional, default is 0.
                        right: 0 // optional, default is 0.
                    },
                    navigatorStyle: {
                        navBarBackgroundColor: '#551A8B',
                        navBarComponentAlignment: 'center',
                        statusBarTextColorScheme: 'light',
                        navBarHidden: true,
                    }, // override the navigator style for the tab screen, see "Styling the navigator" below (optional),
                    navigatorButtons: {} // override the nav buttons for the tab screen, see "Adding buttons to the navigator" below (optional)
                }
                ],
                tabsStyle: {
                    tabBarButtonColor: '#12776b', // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
                    tabBarSelectedButtonColor: '#fff', // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
                    tabBarBackgroundColor: colors.brandGreen, // optional, change the background color of the tab bar
                    initialTabIndex: 0, // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
                },
                appStyle: {
                    tabBarButtonColor: colors.brandLightGray, // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
                    tabBarSelectedButtonColor: colors.brandRed, // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
                    tabBarBackgroundColor: colors.brandLightBlack, // optional, change the background color of the tab bar
                    initialTabIndex: 0, // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
                },
                drawer: {
                    left: {
                        screen: 'dac.SideMenu',
                    },
                    style: {
                        drawerShadow: false,
                        contentOverlayColor: 'rgba(0,0,0,0.25)',
                        leftDrawerWidth: 75,
                        rightDrawerWidth: 30,
                        shouldStretchDrawer: false
                    },
                }
            });
            return;
        case 'my-cards':
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'dac.MyCards',
                    navigatorStyle: {
                        navBarHidden: true,
                    },
                },
                drawer: {
                    left: {
                        screen: 'dac.SideMenu',
                    },
                    style: {
                        drawerShadow: false,
                        contentOverlayColor: 'rgba(0,0,0,0.25)',
                        leftDrawerWidth: 75,
                        rightDrawerWidth: 30,
                        shouldStretchDrawer: false
                    },
                }
            });
            return;
        case 'card-info':
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'dac.CardInfo', // unique ID registered with Navigation.registerScreen
                    icon: require('./app/assets/images/icons/menu.png'), // local image asset for the tab icon unselected state (optional on iOS)
                    iconInsets: { // add this to change icon position (optional, iOS only).
                        top: 6, // optional, default is 0.
                        left: 0, // optional, default is 0.
                        bottom: -6, // optional, default is 0.
                        right: 0 // optional, default is 0.
                    },
                    navigatorStyle: {
                        navBarHidden: true,
                    },
                },
            });
            return;
        case 'family':
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'dac.Companies', // unique ID registered with Navigation.registerScreen
                    icon: require('./app/assets/images/icons/menu.png'), // local image asset for the tab icon unselected state (optional on iOS)
                    iconInsets: { // add this to change icon position (optional, iOS only).
                        top: 6, // optional, default is 0.
                        left: 0, // optional, default is 0.
                        bottom: -6, // optional, default is 0.
                        right: 0 // optional, default is 0.
                    },
                    navigatorStyle: {
                        navBarHidden: true,
                    },
                },
            });
            return;
            case 'profile':
              Navigation.startSingleScreenApp({
                screen: {
                    screen: 'dac.Profile', // unique ID registered with Navigation.registerScreen
                    navigatorStyle: {
                        navBarHidden: true,
                    },
                },
                drawer: {
                    left: {
                        screen: 'dac.SideMenu',
                    },
                    style: {
                        drawerShadow: false,
                        contentOverlayColor: 'rgba(0,0,0,0.25)',
                        leftDrawerWidth: 75,
                        rightDrawerWidth: 30,
                        shouldStretchDrawer: false
                    },
                }
              });
            return;
            case 'family-profile':
            Navigation.startSingleScreenApp({
                screen: {
                screen: 'dac.CompaniesProfile', // unique ID registered with Navigation.registerScreen
                icon: require('./app/assets/images/icons/menu.png'), // local image asset for the tab icon unselected state (optional on iOS)
                iconInsets: { // add this to change icon position (optional, iOS only).
                    top: 6, // optional, default is 0.
                    left: 0, // optional, default is 0.
                    bottom: -6, // optional, default is 0.
                    right: 0 // optional, default is 0.
                },
                navigatorStyle: {
                    navBarHidden: true,
                },
                    },
                    drawer: {
                        left: {
                            screen: 'dac.SideMenu',
                        },
                        style: {
                            drawerShadow: false,
                            contentOverlayColor: 'rgba(0,0,0,0.25)',
                            leftDrawerWidth: 75,
                            rightDrawerWidth: 30,
                            shouldStretchDrawer: false
                        },
                    }
            });
              return;
              case 'settings':
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'dac.Settings', // unique ID registered with Navigation.registerScreen
                        navigatorStyle: {
                            navBarHidden: true,
                        }
                    },
                    drawer: {
                        left: {
                            screen: 'dac.SideMenu',
                        },
                        style: {
                            drawerShadow: false,
                            contentOverlayColor: 'rgba(0,0,0,0.25)',
                            leftDrawerWidth: 75,
                            rightDrawerWidth: 30,
                            shouldStretchDrawer: false
                        },
                    }
                });
            return;
        case 'add-card':
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'dac.AddCard', // unique ID registered with Navigation.registerScreen
                    icon: require('./app/assets/images/icons/menu.png'), // local image asset for the tab icon unselected state (optional on iOS)
                    iconInsets: { // add this to change icon position (optional, iOS only).
                        top: 6, // optional, default is 0.
                        left: 0, // optional, default is 0.
                        bottom: -6, // optional, default is 0.
                        right: 0 // optional, default is 0.
                    },
                    navigatorStyle: {
                        navBarHidden: true,
                    },
                },
            });
            return;
        case 'add-family':
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'dac.AddCompany', // unique ID registered with Navigation.registerScreen
                    icon: require('./app/assets/images/icons/menu.png'), // local image asset for the tab icon unselected state (optional on iOS)
                    iconInsets: { // add this to change icon position (optional, iOS only).
                        top: 6, // optional, default is 0.
                        left: 0, // optional, default is 0.
                        bottom: -6, // optional, default is 0.
                        right: 0 // optional, default is 0.
                    },
                    navigatorStyle: {
                        navBarHidden: true,
                    },
                },
            });
    }
}

store.subscribe(onStoreUpdate.bind());
store.dispatch(changeActiveScreen({ activeScreen: 'login' }));