import { Navigation } from "react-native-navigation";

/**
 * Push a new screen into this screen's navigation stack.
 * @param componentId Scree name
 * @param screenName Screen name
 * @param passProps push new object
 */
export function pushScreen(
  componentId: string,
  screenName: string,
  passProps?: object,
  options?: object
) {
  Navigation.push(componentId, {
    component: {
      id: screenName,
      name: screenName,
      passProps,
      options: {
        ...options,
        topBar: {
          visible: false,
          height: 0
        },
        bottomTabs: {
          visible: false,
          drawBehind: true
        }
      }
    }
  });
}

export function forcePush(screenName: string, passProps: object) {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: screenName,
              name: screenName,
              options: {
                topBar: {
                  visible: false,
                  height: 0
                }
              },
              passProps
            }
          }
        ]
      }
    }
  });
}

export function changeTab(tabId: string, tabIndex: number) {
  Navigation.mergeOptions(tabId, {
    bottomTabs: {
      currentTabIndex: tabIndex
    }
  });

  Navigation.mergeOptions(tabId, {
    sideMenu: {
      left: {
        visible: false
      }
    }
  });
}
