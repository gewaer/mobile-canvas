import { titles, iosTypes } from "./../../styles/types";
import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { pmHelpers } from "../../styles/marginLayout";

export default StyleSheet.create({
  // success button sty;e
  bgButton: {
    backgroundColor: colors.buttonBackground,
    paddingLeft: pmHelpers.N,
    paddingRight: pmHelpers.N
  }
});
