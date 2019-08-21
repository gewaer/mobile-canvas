import { Navigation } from "react-native-navigation";
import Welcome from "./welcome";
import Register from "./register";
import Login from "./login";
import Dashboard from "./dashboard";
import SideMenu from "./side-menu";
import Companies from "./companies";
import ItemInfo from "./item-info";
import EditItem from "./edit-item";
import AddItem from "./add-item";
import AddCompany from "./add-company";
import CompanyInfo from "./company-info";
import EditCompany from "./edit-company";
import Profile from "./profile";
import Settings from "./settings";
import EditProfile from "./edit-profile";
import WrapperProvider from "../config/WrapperProvider";
import AddPost from "./add-post";
import MyScreen from "./my-screen";
import * as screens from "./index";

export default function registerScreens(): void {
  Navigation.registerComponent(screens.WELCOME, () => WrapperProvider(Welcome));
  Navigation.registerComponent(screens.REGISTER, () =>
    WrapperProvider(Register)
  );
  Navigation.registerComponent(screens.LOGIN, () => WrapperProvider(Login));
  Navigation.registerComponent(screens.DASHBOARD, () =>
    WrapperProvider(Dashboard)
  );
  Navigation.registerComponent(screens.BROWSE_COMPANIES, () =>
    WrapperProvider(Companies)
  );
  Navigation.registerComponent(screens.LEADS_INFO, () =>
    WrapperProvider(ItemInfo)
  );
  Navigation.registerComponent(screens.EDIT_LEADS, () =>
    WrapperProvider(EditItem)
  );
  Navigation.registerComponent(screens.ADD_LEADS, () =>
    WrapperProvider(AddItem)
  );
  Navigation.registerComponent(screens.EDIT_COMPANY, () =>
    WrapperProvider(EditCompany)
  );
  Navigation.registerComponent(screens.COMPANY_INFO, () =>
    WrapperProvider(CompanyInfo)
  );
  Navigation.registerComponent(screens.PROFILE_INFO, () =>
    WrapperProvider(Profile)
  );
  Navigation.registerComponent(screens.EDIT_PROFILE, () =>
    WrapperProvider(EditProfile)
  );
  Navigation.registerComponent(screens.SETTINGS, () =>
    WrapperProvider(Settings)
  );
  Navigation.registerComponent(screens.SIDEMENU, () =>
    WrapperProvider(SideMenu)
  );
  Navigation.registerComponent(screens.ADD_COMPANY, () =>
    WrapperProvider(AddCompany)
  );
  Navigation.registerComponent(screens.ADD_POST, () =>
    WrapperProvider(AddPost)
  );
  Navigation.registerComponent(screens.MY_SCREEN, () =>
    WrapperProvider(MyScreen)
  );
}
