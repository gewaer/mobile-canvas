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
    linkBTN: {
        color: '#00A1B4',
        textDecorationLine: "underline",
        fontSize: 14
    },
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
    formInput: {
        borderWidth: 1,
        borderColor: colors.brandSecondary,
        marginTop: 8,
        fontSize: 12,
        paddingLeft: 16,
        paddingRight: 16
    },
    titleBarContent: {
        color: "white",
        fontWeight: "600"
    },
    containerView: {
        marginBottom: 5,
        marginHorizontal: 12
    },
    containerViewBack: {
        flexGrow: 1,
        marginTop: paddingHelpers.XS,
        marginBottom: paddingHelpers.XS,
        paddingVertical: paddingHelpers.N,
        backgroundColor: colors.brandWhite,
        alignItems: 'center',
        paddingHorizontal: paddingHelpers.N,
    },
    textContainer: {
        alignItems: "center",
        marginTop: 10,
        backgroundColor: "transparent"
    },
    divisionLine: {
        height: 1,
        borderBottomWidth: 0.7,
        borderBottomColor: colors.brandDarkGrey
    },
    labelText: {
        fontSize: 14,
        marginTop: 10
    },
    titleText: {
        fontSize: 16,
        color: 'black',
        marginLeft: 12,
        marginVertical: 12
    },
    buttonIcon: {
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 0,
        height: 25,
    },
    formItem: {
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        marginTop: 8
    },
    addFileButton: {
        backgroundColor: colors.brandSecondary,
        height: 54,
        width: 41,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    rowFront: {
      alignItems: 'center',
      backgroundColor: '#CCC',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      justifyContent: 'center',
      height: 50,
    },
    rowBack: {
      alignItems: 'center',
      backgroundColor: '#DDD',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
    }
});
