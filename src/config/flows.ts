import { Navigation } from "react-native-navigation";
import * as screens from "../screens";
import { icons } from "@styles/imagesUris";
import { colors } from "@styles/colors";
import { deviceWidth } from "@styles/globalStyles";
import { deviceHeight } from "@styles/marginLayout";

export function SingleScreenAppWithSideMenu(nextScreen: string) {
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: screens.SIDEMENU,
            name: screens.SIDEMENU,
            passProps: {}
          }
        },
        center: {
          stack: {
            children: [
              {
                component: {
                  name: nextScreen,
                  options: {
                    topBar: {
                      visible: false
                    }
                  },
                  passProps: {}
                }
              }
            ]
          }
        }
      }
    }
  });
}

export function pushDashboard(sideMenuProps, initialTabIndex = 0) {
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          stack: {
            children: [
              {
                component: {
                  id: screens.SIDEMENU,
                  name: screens.SIDEMENU,
                  passProps: sideMenuProps,
                  options: {
                    topBar: {
                      visible: false,
                      drawBehind: false,
                    },
                  },
                },
              },
            ],
          },
        },
        center: {
          bottomTabs: {
            options: {
              bottomTabs: {
                backgroundColor: colors.brandSecondary,
                currentTabIndex: initialTabIndex,
                animate: false,
                titleDisplayMode: 'alwaysHide',
                visible: true,
                drawBehind: false,
                barStyle: 'default',
                translucent: false,
                hideShadow: false,
              },
            },
            children: [
              {
                stack: {
                  children: [
                    {
                      component: {
                        id: screens.DASHBOARD,
                        name: screens.DASHBOARD,
                        options: {
                          bottomTab: {
                            iconColor: colors.white,
                            selectedIconColor: colors.brandGreenDeep,
                            icon: icons.apps.uri,
                            // add this to change icon position (optional, iOS only).
                            iconInsets: {
                              top: 6, // optional, default is 0.
                              left: 0, // optional, default is 0.
                              bottom: -6, // optional, default is 0.
                              right: 0, // optional, default is 0.
                            },
                          },
                          topBar: {
                            visible: false,
                            height: 0,
                          },
                        },
                      },
                    },
                  ],
                },
              },
              {
                stack: {
                  children: [
                    {
                      component: {
                        id: screens.BROWSE_COMPANIES,
                        name: screens.BROWSE_COMPANIES,
                        options: {
                          bottomTab: {
                            iconColor: colors.white,
                            selectedIconColor: colors.brandGreenDeep,
                            icon: icons.family.uri,
                            // add this to change icon position (optional, iOS only).
                            iconInsets: {
                              top: 6, // optional, default is 0.
                              left: 0, // optional, default is 0.
                              bottom: -6, // optional, default is 0.
                              right: 0, // optional, default is 0.
                            },
                          },
                          topBar: {
                            visible: false,
                            height: 0,
                          },
                        },
                      },
                    },
                  ],
                },
              },
              {
                stack: {
                  children: [
                    {
                      component: {
                        id: screens.ADD_POST,
                        name: screens.ADD_POST,
                        options: {
                          bottomTab: {
                            iconColor: colors.white,
                            selectedIconColor: colors.brandGreenDeep,
                            icon: icons.family.uri,
                            // add this to change icon position (optional, iOS only).
                            iconInsets: {
                              top: 6, // optional, default is 0.
                              left: 0, // optional, default is 0.
                              bottom: -6, // optional, default is 0.
                              right: 0, // optional, default is 0.
                            },
                          },
                          topBar: {
                            visible: false,
                            height: 0,
                          },
                        },
                      },
                    },
                  ],
                },
              },
              {
                component: {
                  id: screens.MY_SCREEN,
                  name: screens.MY_SCREEN,
                  options: {
                    bottomTab: {
                      iconColor: colors.white,
                      selectedIconColor: colors.brandGreenDeep,
                      icon: icons.apps.uri,
                      iconInsets: {
                        top: 6,
                        left: 0,
                        bottom: -6,
                        right: 0,
                      },
                    },
                    topBar: {
                      visible: false,
                    },
                  },
                },
              }
            ],
          },
        },
        options: {
          sideMenu: {
            left: {
              width: 230,
            },
          },
        },
      },
    },
  });
}

export function auth() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: screens.WELCOME,
              name: screens.WELCOME,
            },
          }
        ],
        options: {},
      },
    },
  });
}

export function defaultProps() {
  Navigation.setDefaultOptions({
    statusBar: {
      visible: true,
      style: "light", // it can be dark too,
      hideWithTopBar: false,
      blur: false
    },
    layout: {
      direction: "ltr", // Supported directions are: 'rtl', 'ltr'
      backgroundColor: colors.white,
      orientation: ["portrait"] // An array of supported orientations ["landscape"]
    },
    popGesture: true,
    // backgroundImage: null,
    // rootBackgroundImage: null,
    modalPresentationStyle: "fullScreen", // Supported styles are: 'formSheet', 'pageSheet', 'overFullScreen', 'overCurrentContext', 'currentContext', 'popover', 'fullScreen' and 'none'. On Android, only overCurrentContext and none are supported.
    topBar: {
      barStyle: "default", // it can be black
      visible: false,
      animate: false,
      hideOnScroll: false,
      drawBehind: false,
      title: {},
      subtitle: {},
      backButton: {},
      background: {},
      noBorder: false,
      searchBar: false,
      searchBarHiddenWhenScrolling: false,
      // searchBarPlaceholder: "null",
      largeTitle: {}
    },
    // bottomTabs: {
    //   visible: true,
    //   animate: true, // Controls whether BottomTabs visibility changes should be animated
    //   currentTabIndex: 0,
    //   drawBehind: false,
    //   backgroundColor: colors.brandSecondary,
    //   barStyle: "default", // 'black',
    //   translucent: false,
    //   hideShadow: false
    // },
    sideMenu: {
      left: {
        shouldStretchDrawer: false, // defaults to true, when false sideMenu contents not stretched when opened past the width
        // animationVelocity: 2500, // defaults to 840, high number is a faster sideMenu open/close animation
        width: deviceWidth * 0.8,
        height: deviceHeight * 0.8,
        visible: false,
        enabled: true
      },
      right: {
        shouldStretchDrawerk: false, // defaults to true, when false sideMenu contents not stretched when opened past the width
        // animationVelocity: 2500, // defaults to 840, high number is a faster sideMenu open/close animation
        visible: false,
        enabled: false
      }
    },
    overlay: {
      interceptTouchOutside: true,
      handleKeyboardEvents: true
    }
  });
}
