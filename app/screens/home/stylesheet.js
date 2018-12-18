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
        color: '#00A1B4',
        textDecorationLine: "underline",
        fontSize: 14
    },
    submitBtn: {
        backgroundColor: colors.brandRed,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        width: 90,
        alignSelf: 'flex-end',
        height: 25,
        marginLeft: 12
    },
    formItem: {
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: 4,
        borderColor: colors.brandLightGray,
        height: 27,
    },
    formInput: {
        borderWidth: 1,
        borderColor: '#00A1B4',
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
        marginBottom: paddingHelpers.S,
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
        height: 3,
        borderBottomWidth: 3,
        borderBottomColor: colors.brandDarkGrey
    },
    labelText: {
        fontSize: 14,
        marginTop: 10
    },
    titleText: {
        fontSize: 16,
        color: '#00A1B4',
        marginLeft: 12,
        marginVertical: 12
    },
    buttonIcon: {
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 0,
        height: 27,
    },
    topContainer: {
        marginHorizontal: 12,
        marginVertical: 16,
        flexDirection: 'row'
    }
});
