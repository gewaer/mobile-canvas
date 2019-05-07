import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "../../config/styles";
// Responsive Const
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const isIphoneX =
  platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
export default StyleSheet.create({
  rowFront: {
    alignItems: 'center',
    backgroundColor: colors.brandPrimary,
    justifyContent: 'center',
    height: 60,
    marginBottom: 10,
    borderRadius: 5
  },
});
