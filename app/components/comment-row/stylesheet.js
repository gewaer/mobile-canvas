import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "../../config/styles";
// Responsive Const
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const isIphoneX =
  platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
export default StyleSheet.create({
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
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
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 16
  },
  topContainer: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 2
  },
  subTitle: {
    fontSize: 12,
     color: colors.brandLightGray
  },
  content: {
    fontSize: 12
  },
  bottomText: {
    color: '#00A1B4',
    fontSize: 15,
    marginLeft: 5
  }
});
