import { StyleSheet, Platform, Dimensions } from "react-native";
import {
    colors,
    paddingHelpers,
} from "../../config/styles";
// Responsive Const
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX =
  platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
export default StyleSheet.create({
    linkBTN: {
        color: colors.brandOrange,
        textDecorationLine: "underline",
        fontSize: 14
    },
    submitBtn: {
        marginTop: paddingHelpers.S,
        marginBottom: paddingHelpers.S,
        borderColor: colors.brandRed,
        backgroundColor: colors.normalWhite,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    googleBtn: {
        backgroundColor: colors.gmail,
        width: '100%',
        alignItems: 'center'
    },
    googleText: {
        color: "#fff",
        textAlign: 'center',
        width: '100%'
    },
    facebookBtn: {
        marginTop: paddingHelpers.S,
        marginBottom: paddingHelpers.XS,
        backgroundColor: colors.facebook,
        width: '100%',
        alignItems: 'center'
    },
    facebookText: {
        color: "#fff",
        textAlign: 'center',
        width: '100%'
    },
    formItem: {
        borderBottomWidth: 2,
        borderBottomColor: '#241D1E'
    },
    titleBarContent: {
        color: "white",
        fontWeight: "600"
    },
    containerView: {
        marginTop: paddingHelpers.N,
        marginBottom: paddingHelpers.XS,
        paddingHorizontal: paddingHelpers.XL7,
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
        height: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.brandOrange
    }
});
