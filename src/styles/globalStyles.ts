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

export const globalStyles = {
  //Button Row Contianer
  buttonContainer: {
    marginTop: pmHelpers.S,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  //Centered Item
  centered: {
    justifyContent: "center",
    alignItems: "center"
  },
  // Main Container to Screens in Portrait
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    padding: pmHelpers.S
  }
};
