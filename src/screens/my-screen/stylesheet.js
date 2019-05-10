import { StyleSheet, Platform, Dimensions } from "react-native";
import {
    paddingHelpers,
    colors
} from "../../../src/config/styles";
// Responsive Const
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX =
  platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
export default StyleSheet.create({
    submitBtn: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      width: 169,
      alignSelf: 'center',
      height: 30,
      marginHorizontal: 16,
      marginBottom: Platform.OS == 'ios' ? 0 : 20
    },
    titleBarContent: {
      color: "white",
      fontWeight: "600"
    },
    buttonIcon: {
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 0,
        height: 25,
    },
    rowFront: {
      alignItems: 'center',
      backgroundColor: 'white',
      justifyContent: 'center',
      height: 60,
      marginBottom: 10,
      borderRadius: 5
    },
    rowBack: {
      alignItems: 'center',
      backgroundColor: colors.brandPrimary,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingLeft: 15,
      marginBottom: 10,
      borderRadius: 5
    },
    modalContainer: {
      flex: 1,
      flexDirection: 'column',
      paddingTop: 60,
      alignItems: 'center',
      backgroundColor: colors.brandPrimaryAlterTrans
    }
});
