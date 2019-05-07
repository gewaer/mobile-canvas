import { Navigation } from 'react-native-navigation';

import { colors } from '../config/styles';

export function pushSingleScreenAppWithSideMenu(screenName, screenProps, sideMenuProps) {
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: 'navigation.drawer.left',
            name: 'canvas.SideMenu',
            passProps: sideMenuProps
          }
        },
        center: {
          stack: {
            children: [
              {
                component: {
                  name: screenName,
                  options: {
                    topBar: {
                      visible: false
                    }
                  },
                  passProps: screenProps
                }
              }
            ]
          }
        }
      }
    }
  });
}

export function pushSingleScreenApp(screenName, screenProps) {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: screenName,
              options: {
                topBar: {
                  visible: false
                }
              },
              passProps: screenProps
            }
          }
        ],
      }
    }
  });
}

export function pushDashboard(sideMenuProps) {
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: 'navigation.drawer.left.tab',
            name: 'canvas.SideMenu',
            passProps: sideMenuProps,
            options: {
              drawerShadow: false
            }
          }
        },
        center: {
          bottomTabs: {
            options: {
              bottomTabs: {  
                backgroundColor: colors.brandSecondary,
                currentTabIndex: 0,
              }
            },
            children: [
              {
                component: {
                  id: 'navigation.dashboard',
                  name: 'canvas.Dashboard',
                  options: {
                    bottomTab: {
                      iconColor: 'white',
                      selectedIconColor: colors.brandPrimaryAlter,
                      icon: require('../assets/images/icons/apps.png'),
                      // add this to change icon position (optional, iOS only).
                      iconInsets: {
                        top: 6, // optional, default is 0.
                        left: 0, // optional, default is 0.
                        bottom: -6, // optional, default is 0.
                        right: 0 // optional, default is 0.
                      },
                    },
                    topBar: {
                      visible: false
                    }
                  }
                }
              },
              {
                component: {
                  id: 'navigation.companies',
                  name: 'canvas.Companies',
                  options: {
                    bottomTab: {
                      iconColor: 'white',
                      selectedIconColor: colors.brandPrimaryAlter,
                      icon: require('../assets/images/icons/family.png'),
                      // add this to change icon position (optional, iOS only).
                      iconInsets: {
                        top: 6, // optional, default is 0.
                        left: 0, // optional, default is 0.
                        bottom: -6, // optional, default is 0.
                        right: 0 // optional, default is 0.
                      }
                    },
                    topBar: {
                      visible: false
                    }
                  }
                }
              },
              {
                component: {
                  id: 'navigation.addPost',
                  name: 'canvas.AddPost',
                  options: {
                    bottomTab: {
                      iconColor: 'white',
                      selectedIconColor: colors.brandPrimaryAlter,
                      icon: require('../assets/images/icons/family.png'),
                      // add this to change icon position (optional, iOS only).
                      iconInsets: {
                        top: 6, // optional, default is 0.
                        left: 0, // optional, default is 0.
                        bottom: -6, // optional, default is 0.
                        right: 0 // optional, default is 0.
                      }
                    },
                    topBar: {
                      visible: false
                    }
                  }
                }
              },
              {
                component: {
                  id: 'navigation.mySscreen',
                  name: 'canvas.MyScreen',
                  options: {
                    bottomTab: {
                      iconColor: 'white',
                      selectedIconColor: colors.brandPrimaryAlter,
                      icon: require('../assets/images/icons/apps.png'),
                      // add this to change icon position (optional, iOS only).
                      iconInsets: {
                        top: 6, // optional, default is 0.
                        left: 0, // optional, default is 0.
                        bottom: -6, // optional, default is 0.
                        right: 0 // optional, default is 0.
                      }
                    },
                    topBar: {
                      visible: false
                    }
                  }
                }
              }
            ]
          }
        }
      }
    }
  });
}
