import { Navigation } from "react-native-navigation";
import * as screens from "../screens";
import { icons } from "@styles/imagesUris";
import { colors } from "@styles/colors";
import { deviceWidth } from "@styles/globalStyles";
import { deviceHeight } from "@styles/marginLayout";
import { tabChildren } from "./navigationComponents";

export function pushSingleScreenAppWithSideMenu(screenName: string, screenProps: string, passProps: string) {
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: screens.SIDEMENU,
            name: screens.SIDEMENU,
            passProps
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
                      visible: false,
                      height: 0
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

export function pushDashboard(sideMenuProps: object, initialTabIndex: number = 0) {
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          stack: {
            children: [
              {
                component: {
                  id: screens.GWSIDEMENU,
                  name: screens.GWSIDEMENU,
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
            children: tabChildren
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

export function openDrawer() {
  Navigation.mergeOptions(screens.SIDEMENU, {
    sideMenu: {
      left: {
        visible: true
      }
    }
  });
}
