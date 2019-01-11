import { Navigation } from 'react-native-navigation';
import Login from './screens/login';
import ForgotPassword from './screens/forgot-password';
import Condominiums from './screens/condominiums';
import Reports from './screens/reports';
import AddPost from './screens/add-post';
import Home from './screens/home';
import PostDetail from './screens/post-detail';
import Bills from './screens/bills';
import BillDetail from './screens/bill-detail';
import Profile from "./screens/profile";

import Welcome from './screens/Welcome';
import TitleBar from "./components/TitleBar";
import SideMenu from './components/SideMenu';
import Dashboard from './screens/Dashboard';
import Companies from "./screens/Companies";
import AddCompany from "./screens/AddCompany";
import Company from "./screens/Company";
import EditCompany from "./screens/EditCompany";
import EditProfile from "./screens/EditProfile";
import Settings from "./screens/Settings";
import Register from "./screens/Register";
import ItemInfo from "./screens/ItemInfo";
import EditItem from "./screens/EditItem";
import AddItem from "./screens/AddItem";

export function registerScreen(store, Provider) {
    Navigation.registerComponent('vv.ForgotPassword', () => ForgotPassword, store, Provider);
    Navigation.registerComponent('vv.Login', () => Login, store, Provider);
    Navigation.registerComponent('vv.Condominiums', () => Condominiums, store, Provider);
    Navigation.registerComponent('vv.Reports', () => Reports, store, Provider);
    Navigation.registerComponent('vv.AddPost', () => AddPost, store, Provider);
    Navigation.registerComponent('vv.Home', () => Home, store, Provider);
    Navigation.registerComponent('vv.PostDetail', () => PostDetail, store, Provider);
    Navigation.registerComponent('vv.Bills', () => Bills, store, Provider);
    Navigation.registerComponent('vv.BillDetail', () => BillDetail, store, Provider);
    Navigation.registerComponent('vv.Profile', () => Profile, store, Provider);
    
    Navigation.registerComponent('dac.Welcome', () => Welcome, store, Provider);
    Navigation.registerComponent('dac.Register', () => Register, store, Provider);
    Navigation.registerComponent('dac.SideMenu', () => SideMenu, store, Provider);
    Navigation.registerComponent('dac.Dashboard', () => Dashboard, store, Provider);
    Navigation.registerComponent('dac.AddCompany', () => AddCompany, store, Provider);
    Navigation.registerComponent('dac.CompaniesProfile', () => Company, store, Provider);
    Navigation.registerComponent('dac.EditCompany', () => EditCompany, store, Provider);
    Navigation.registerComponent('dac.EditProfile', () => EditProfile, store, Provider);
    Navigation.registerComponent('dac.ItemInfo', () => ItemInfo, store, Provider);
    Navigation.registerComponent('dac.EditItem', () => EditItem, store, Provider);
    Navigation.registerComponent('dac.AddItem', () => AddItem, store, Provider);
    Navigation.registerComponent('dac.Settings', () => Settings, store, Provider);
    Navigation.registerComponent('dac.Companies', () => Companies, store, Provider);
    Navigation.registerComponent('dac.TitleBar', () => TitleBar);
}