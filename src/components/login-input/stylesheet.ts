import { titles, iosTypes } from "./../../styles/types";
import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export default StyleSheet.create({
  // Custom style to label
  formLabel: {
    ...titles.button,
    fontSize: iosTypes.system14
  },
  // Custom Input
  input: {
    height: 60,
    color: colors.black
  }
});
