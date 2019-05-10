import { titles, iosTypes } from "./../../styles/types";
import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { pmHelpers } from "../../styles/marginLayout";

export default StyleSheet.create({
  buttonContainer: {
    borderWidth: 2
  },
  buttonText: {
    ...titles.button,
    color: colors.red,
    paddingLeft: pmHelpers.N,
    paddingRight: pmHelpers.N
  }
});
