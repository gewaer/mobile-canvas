import { colors } from "@styles/colors";
import { icons } from "@styles/imagesUris";
import * as screens from "@screens";

const resources = [
  {
    id: "0",
    name: "Dashboard",
    slug: "dashboard",
    tabType: "browse"
  },
  {
    id: "0",
    name: "Dashboard",
    slug: "dashboard",
    tabType: "browse"
  },
  {
    id: "0",
    name: "Dashboard",
    slug: "dashboard",
    tabType: "browse"
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

export const tabChildren = resources.map(resource => getTab(resource.tabType));
