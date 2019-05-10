////////////////////////////////////////////////////////
//           NUMBERS FOR PADDINGS AND MARGINS        //
//////////////////////////////////////////////////////
import { Dimensions, Platform, PixelRatio } from "react-native";
// Responsive Const
export const deviceHeight = Dimensions.get("window").height;
export const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX =
  platform === "ios" && deviceHeight === 812 && deviceWidth === 375;

export const pmHelpers = {
  XS: platform === "ios" ? 6 : 8,
  S: platform === "ios" ? 14 : 16,
  N: platform === "ios" ? 22 : 24,
  LG: platform === "ios" ? 24 : 26,
  XL: platform === "ios" ? 26 : 28,
  XL2: platform === "ios" ? 28 : 30,
  XL3: platform === "ios" ? 30 : 32,
  XL4: platform === "ios" ? 32 : 34
};
