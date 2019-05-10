import { Navigation } from "react-native-navigation";
import Welcome from "./welcome";
import Register from "./register";
import Login from "./login";
import Dashboard from "./dashboard";
import SideMenu from "../components/side-menu";
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

export default function registerScreens(): void {
  Navigation.registerComponent("canvas.Welcome", () =>
    WrapperProvider(Welcome)
  );
  Navigation.registerComponent("canvas.Register", () =>
    WrapperProvider(Register)
  );
  Navigation.registerComponent("canvas.Login", () => WrapperProvider(Login));
  Navigation.registerComponent("canvas.Dashboard", () =>
    WrapperProvider(Dashboard)
  );
  Navigation.registerComponent("canvas.Companies", () =>
    WrapperProvider(Companies)
  );
  Navigation.registerComponent("canvas.ItemInfo", () =>
    WrapperProvider(ItemInfo)
  );
  Navigation.registerComponent("canvas.EditItem", () =>
    WrapperProvider(EditItem)
  );
  Navigation.registerComponent("canvas.AddItem", () =>
    WrapperProvider(AddItem)
  );
  Navigation.registerComponent("canvas.EditCompany", () =>
    WrapperProvider(EditCompany)
  );
  Navigation.registerComponent("canvas.CompanyInfo", () =>
    WrapperProvider(CompanyInfo)
  );
  Navigation.registerComponent("canvas.Profile", () =>
    WrapperProvider(Profile)
  );
  Navigation.registerComponent("canvas.EditProfile", () =>
    WrapperProvider(EditProfile)
  );
  Navigation.registerComponent("canvas.Settings", () =>
    WrapperProvider(Settings)
  );
  Navigation.registerComponent("canvas.SideMenu", () =>
    WrapperProvider(SideMenu)
  );
  Navigation.registerComponent("canvas.AddCompany", () =>
    WrapperProvider(AddCompany)
  );
  Navigation.registerComponent("canvas.AddPost", () =>
    WrapperProvider(AddPost)
  );
  Navigation.registerComponent("canvas.MyScreen", () =>
    WrapperProvider(MyScreen)
  );
}
