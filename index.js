/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import { Navigation } from "react-native-navigation";
import registerScreens from "./src/screens/registerScreen";
import "./src/config/sentry";
import { auth, defaultProps } from "./src/config/flows";

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  defaultProps();
  auth();
});