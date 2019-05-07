import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "../../config/styles";
// Responsive Const
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const isIphoneX =
  platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
export default StyleSheet.create({
  container: {
    height: 235,
    width: 335,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowOffset:{
      width: 4,
      height: 4
    },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    justifyContent: 'space-between'
  },
  submitBtn: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    height: 48,
    borderRadius: 3,
    backgroundColor: colors.brandPrimaryAlter
  },
  submitBtnInv: {
    borderBottomWidth: 2.5,
    borderTopWidth: 2.5,
    borderLeftWidth: 2.5,
    borderRightWidth: 2.5,
    borderColor: colors.deleteColor,
    height: 48,
    borderRadius: 3,
    backgroundColor: 'white'
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25
  },
  buttonTextDelete: {
    color: colors.deleteColor,
    fontWeight: 'bold'
  },
  buttonTextAccept: {
    color: 'white',
    fontWeight: 'bold'
  },
  subTitle: {
    alignSelf: 'center',
    marginVertical: 13,
    color: colors.brandDarkGrey,
    fontSize: 14
  },
  title: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.brandPrimary
  },
  bottomContainer: {
    borderTopWidth: 2,
    borderColor: colors.brandLightGray,
    paddingBottom: 35
  }
});
