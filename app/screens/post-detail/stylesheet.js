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
        backgroundColor: '#68B143',
        width: 25,
        height: 25,
        justifyContent: 'center',
        paddingTop: 0,
        paddingBottom: 0,
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
        borderColor: '#68B143',
        height: 25,
        borderRadius: 12
    },
    titleBarContent: {
        color: "black",
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
        borderBottomColor: colors.brandLightGray
    },
    labelText: {
        fontSize: 14,
        marginTop: 10
    },
    buttonIcon: {
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 0,
        height: 27,
    },
    topContainer: {
        marginHorizontal: 16,
        marginVertical: 16
    },
    commentRowBotom: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginTop: 16
    },
    commentRowTop: {
        flexDirection: 'row',
        marginHorizontal: 16,
    },
    commentRow: {
        marginVertical: 16
    },
    descriptionContainer: {
        marginTop: 12
    },
    titleContainer: {
        marginBottom: 12
    },
    titleText: {
        fontSize: 14,
        color: 'black'
    }
});
