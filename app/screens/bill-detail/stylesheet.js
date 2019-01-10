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
    titleSection: {
        borderBottomWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 20,
        flexDirection: 'row',
        borderColor: colors.brandLightGray,
        backgroundColor: colors.normalWhite
    },
    title: {
        fontSize: 14
    },
    titleLeftContainer: {
        width: '70%',
        borderRightWidth: 1,
        borderColor: colors.brandLightGray,
        paddingRight: 35
    },
    titleRightContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 5
    },
    date: {
        fontSize: 10,
        color: 'gray',
        alignSelf: 'flex-end'
    },
    amount: {
        fontWeight: 'bold',
        fontSize: 20
    },
    titleBottom: {
        borderBottomWidth: 1,
        borderColor: colors.brandLightGray,
        paddingTop: 30
    },
    listRowContainer: {
        flexDirection: 'row',
        padding: 8,
        borderColor: colors.brandLightGray,
        borderBottomWidth: 1
    },
    listAppRowContainer: {
        padding: 8,
        borderColor: colors.brandLightGray,
        borderBottomWidth: 1
    },
    listRowLabel: {
        fontSize: 12,
        color: 'gray'
    },
    listRowContent: {
        fontSize: 12
    },
    listTitleContainer: {
        paddingTop: 20,
        paddingLeft: 16,
        borderBottomWidth: 1
    },
    listTitle: {
        fontSize: 14,
        fontWeight: 'bold'
    }
});
