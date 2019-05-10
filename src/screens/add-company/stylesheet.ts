import { globalStyles } from "@styles/globalStyles";
import { StyleSheet } from "react-native";
import { colors, paddingHelpers } from "../../config/styles";
export default StyleSheet.create({
  submitBtn: {
    marginTop: paddingHelpers.S,
    marginBottom: paddingHelpers.S,
    borderColor: colors.brandWhite
  },
  formItem: {
    borderBottomWidth: 0.5
  },
  imageContainer: {
    ...globalStyles.centered
  },
  imageSize: {
    height: 45,
    width: 45,
    tintColor: colors.brandGrey
  }
});
