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
    formItem: {
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#B5B5B5',
        marginTop: 8,
        height: 29.5,
        borderRadius: 3
    },
    titleBarContent: {
        color: "white",
        fontWeight: "600"
    },
    containerView: {
        marginBottom: paddingHelpers.S,
        marginHorizontal: 12
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
    expandedSection: {
        borderWidth: 1,
        borderTopWidth: 0,
        paddingBottom: 5,
        marginBottom: 5,
        marginHorizontal: 12,
        borderRadius: 3
    },
    balanceRow:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 75
    },
    balanceTitle: {
        fontSize: 16,
        color: '#241D1E',
        marginBottom: 5
    },
    balanceSubTitle: {
        fontSize: 12
    }
});
