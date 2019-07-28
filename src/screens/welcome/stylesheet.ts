import { StyleSheet } from "react-native";
import { colors } from "@styles/colors";
import { paddingHelpers } from "@styles/marginLayout";
import { globalStyles } from "@styles/globalStyles";
import { titles } from "@styles/types";
import { iosTypes } from "@styles/types";
import { pmHelpers } from "@styles/marginLayout";

export default StyleSheet.create({
  centered: {
    flex: 1,
    ...globalStyles.centered
  },
  title: {
    fontSize: iosTypes.subHeader,
    fontWeight: "bold",
    color: colors.brandPrimary
  },
  logoContainer: {},
  logoBig: {
    width: 280,
    height: 300,
    borderWidth: 1,
    overflow: "visible"
  },
  buttonContainer: {
    paddingVertical: pmHelpers.S,
    marginHorizontal: pmHelpers.S
  },
  btnSignIn: {
    marginVertical: 4,
    backgroundColor: colors.brandPrimary
  },
  btnTextStyle: {
    ...titles.button,
    color: colors.white
  },
  btnLogIn: {
    marginVertical: 4,
    borderColor: colors.brandSecondary,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderTopWidth: 2
  },
  btnTextLogIn: {
    ...titles.button,
    color: colors.brandPrimary
  }
});
