import { StyleSheet, Platform, Dimensions, PixelRatio } from "react-native";
import { colors } from "../../config/styles";
// Responsive Const
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const isIphoneX =
  platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
export default StyleSheet.create({
  container: {
    backgroundColor: '#68B143',
    height: 74,
    width: 59,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonIcon: {
    color: 'white',
    fontSize: 45
  }
});
