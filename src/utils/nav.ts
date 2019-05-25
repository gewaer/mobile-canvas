import { Navigation } from "react-native-navigation";

export function push(
  componentId: string,
  screenName: string,
  passProps: object
) {
  Navigation.push(componentId, {
    component: {
      name: screenName,
      passProps,
      options: {}
    }
  });
}
/**
 * go back to preview screen
 * @param componentId - actual screen id
 */
export function pop(componentId: string) {
  Navigation.pop(componentId);
}

export function popTo(componentId: string) {
  Navigation.popTo(componentId);
}

export function popToRoot(componentId: string) {
  Navigation.popToRoot(componentId);
}
export function setNewStack(componentId: string, screenName: string) {
  Navigation.setStackRoot(componentId, [
    {
      component: {
        name: screenName,
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

export function showModal(componentId: string, screenName: string) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: screenName,
            passProps: {},
            options: {}
          }
        }
      ]
    }
  });
}
export function dismissModal(componentId: string) {
  Navigation.dismissModal(componentId);
}

export function dismissAllModals() {
  Navigation.dismissAllModals();
}

export function mergeOptions(componentId: string, options: object) {
  Navigation.mergeOptions(componentId, {
    options
    // topBar: {
    //   visible: true,
    //   title: {
    //     text: 'Title'
    //   }
    // },
    // bottomTabs: {

    // },
    // bottomTab: {

    // },
    // sideMenu: {

    // },
    // overlay: {

    // }
  });
}
