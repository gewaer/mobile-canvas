////////////////////////////////////////////////////////
// LAYOUT-RULES AND PIXEL RATIO FOR REPONSIVE ISSUES //
//////////////////////////////////////////////////////

import { Dimensions, Platform, PixelRatio } from "react-native";
// Responsive Const
export const deviceHeight = Dimensions.get("window").height;
export const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX =
  platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
// import helpers
import { colors } from "./colors";
import { iosTypes } from "./types";
import { pmHelpers } from "./marginLayout";

export const globalStyles = {};
