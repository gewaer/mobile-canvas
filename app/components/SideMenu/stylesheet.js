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
  // Cover
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10
  },
  drawerImage: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
    top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
    width: 210,
    height: 75,
    resizeMode: "cover"
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  },
  // Sidebar Styles
  container: {
    flex: 1
  },
  navItemStyle: {
    padding: 10,
    color: colors.brandBlack,
    // fontFamily: "Akkurat-Bold",
  },
  navSectionStyle: {
    backgroundColor: colors.normalWhite
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    alignItems: "center",
    backgroundColor: colors.normalWhite,
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: 20
  },
  // header Style
  userImage: {
    width: 50,
    height: 50,
    marginHorizontal: 15
  },
  foregroundContainer: {
    width: 300,
    height: 140
  },
  logoutButton: {
    position: "absolute",
    top: 60,
    right: 15
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#000",
    opacity: 0.6
  },
  userInfoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  // For bg colors
  darkerColor: {
    backgroundColor: "#1E2A39"
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 2,
    color: colors.normalWhite
  },
  subTitle: {
    fontSize: 13,
     color: colors.normalWhite
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderColor: colors.brandLightGray,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: 'white' //REMOVE THIS
  },
  itemContainer: {
    borderBottomWidth: 0.6,
    borderBottomColor: "#707070",
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row'
  },
});
