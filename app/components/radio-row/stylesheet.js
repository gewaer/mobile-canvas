import { StyleSheet, Platform, Dimensions, PixelRatio } from "react-native";
import { colors } from "../../config/styles";
// Responsive Const
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX =
  platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
export default StyleSheet.create({
  thumbnail: {
    width: 40,
    height: 40,
    borderColor: colors.brandLightGray,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 12
  },
  itemContainer: {
    borderBottomWidth: 0.6,
    borderBottomColor: "#707070",
    flexDirection: 'row',
    paddingVertical: 25,
    paddingHorizontal: 12
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2
  },
  subTitle: {
    fontSize: 12
  },
  rightStyle: {
    alignSelf: 'center',
    marginLeft: 'auto'
  }
});
