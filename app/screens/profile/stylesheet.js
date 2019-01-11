import { StyleSheet, Platform, Dimensions } from "react-native";
import {
    colors,
    paddingHelpers,
} from "../../config/styles";
// Responsive Const
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
export default StyleSheet.create({
    titleBarContent: {
        color: "white",
        fontWeight: "600"
    },
    divisionLine: {
        height: 1,
        borderBottomWidth: 0.7,
        borderBottomColor: colors.brandDarkGrey
    },
    photoSection: {
        paddingHorizontal: 16,
        height: 250,
        backgroundColor: colors.normalWhite,
        justifyContent: 'center'
    },
    profileRowLabel: {
        borderTopWidth: 1,
        borderColor: colors.brandLightGray,
        height: 32,
        justifyContent: 'flex-end',
        paddingVertical: 2,
        paddingHorizontal: 12
    },
    profileRowContent: {
        borderTopWidth: 1,
        paddingHorizontal: 12,
        backgroundColor: colors.normalWhite,
        height: 45,
        justifyContent: 'center'
    },
    profilePhoto: {
        width: 145,
        height: 145,
        borderColor: colors.brandLightGray,
        borderWidth: 2,
        borderRadius: 145/2,
        alignSelf: 'center'
    },
    button: {
        borderColor: colors.brandGreenDeep,
        backgroundColor: colors.normalWhite,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        width: 178,
        height: 27,
        paddingBottom: 0,
        paddingTop: 0,
        alignSelf: 'center'
    },
});
