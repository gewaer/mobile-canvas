import { colors } from "@styles/colors";
import { icons } from "@styles/imagesUris";
import * as screens from "@screens";
import _ from "lodash";

const resources = [
  {
    id: "0",
    name: "Dashboard",
    slug: "dashboard",
    mobile_component_type: "browse",
    mobile_navigation_type: "tab",
    mobile_tab_index: "0"
  },
  {
    id: "1",
    name: "Companies",
    slug: "companies",
    mobile_component_type: "browse",
    mobile_navigation_type: "screen"
  },
  {
    id: "2",
    name: "Users",
    slug: "users",
    mobile_component_type: "browse",
    mobile_navigation_type: "tab",
    mobile_tab_index: "1"
  }
];

const getTabOptions = (icon: string) => {
  return {
    bottomTab: {
      iconColor: colors.white,
      selectedIconColor: colors.brandGreenDeep,
      icon,
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
  };
}

export const tabChild = (screenId: string, passProps?: object, icon?: string) => {
  return {
    stack: {
      children: [
        {
          component: {
            id: screenId,
            name: screenId,
            passProps,
            options: getTabOptions(icons.apps.uri),
          },
        },
      ],
    }
  };
};

const getTab = (tabType: string) => {
  switch (tabType) {
    case "browse":
      return tabChild(screens.DASHBOARD);
    default:
      return;
  }
}

let sortedResources = _.orderBy(resources, ["mobile_tab_index"], ["asc"]);

sortedResources = sortedResources.filter(resource => resource.mobile_navigation_type === "tab");

export const tabChildren = sortedResources.map(resource => getTab(resource.mobile_component_type));
