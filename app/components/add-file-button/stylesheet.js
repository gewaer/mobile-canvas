import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "../../config/styles";
// Responsive Const
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
  platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
export default StyleSheet.create({
  container: {
    backgroundColor: colors.brandLightGray,
    height: 54,
    width: 41,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonIcon: {
    color: 'white',
    fontSize: 40
  }
});
