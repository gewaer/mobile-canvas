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
  passProps: object,
  options: object
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

/**
 * go back to preview screen
 * @param componentId - actual screen id
 */
export function popScreen(componentId: string, mergeOptions: object) {
  Navigation.pop(componentId, mergeOptions);
}

/**
 * Pop the stack to a given component.
 * @param componentId Screen name
 * @param mergeOptions Styling options
 */
export function popToScreen(componentId: string, mergeOptions: object) {
  Navigation.popTo(componentId, mergeOptions);
}

/**
 * Pop all the screens until the root from this screen's navigation stack.
 * @param componentId Screen name
 * @param mergeOptions Stylign options
 */
export function popToRoot(componentId: string, mergeOptions: object) {
  Navigation.popToRoot(componentId, mergeOptions);
}

/**
 * Reset the current navigation stack to a new screen component
 * @param componentId Screen name
 * @param screenName Screen Name
 * @param passProps Push new properties
 */
export function setNewStack(
  componentId: string,
  screenName: string,
  passProps: any
) {
  Navigation.setStackRoot(componentId, [
    {
      component: {
        id: screenName,
        name: screenName,
        passProps,
        options: {
          animations: {
            setStackRoot: {
              enabled: true
            }
          }
        }
      }
    }
  ]);
}

/**
 * Show a screen as a modal.
 * @param screenName Screen Name
 * @param passProps push objects to screen
 */
export function showModal(screenName: string, passProps: any) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: screenName,
            name: screenName,
            passProps,
            options: {
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
        }
      ]
    }
  });
}

/**
 * Dismiss the current modal.
 * @param componentId Screen Name
 */
export function dismissModal(componentId: string, mergeOptions?: object = {}) {
  Navigation.dismissModal(componentId, mergeOptions);
}

/**
 * Dismiss all the current modals at the same time.
 */
export function dismissAllModals(mergeOptions?: object = {}) {
  Navigation.dismissAllModals(mergeOptions);
}

/**
 * Set options dynamically for component.
 * @param componentId Screen Name
 * @param mergeOptions options to style
 */
export function mergeOptions(componentId: string, mergeOptions?: object = {}) {
  Navigation.mergeOptions(componentId, mergeOptions);
}
