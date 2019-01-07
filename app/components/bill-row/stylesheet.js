import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "../../config/styles";
// Responsive Const
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const isIphoneX =
  platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
export default StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 0.6,
    borderBottomColor: "#707070",
    paddingVertical: 12,
    marginHorizontal: 12
  },
  title: {
    fontSize: 12,
    marginBottom: 2,
    maxWidth: '73%'
  },
  subTitle: {
    fontSize: 12,
     color: colors.brandLightGray
  }
});
