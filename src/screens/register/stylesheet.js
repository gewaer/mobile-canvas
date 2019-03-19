import { StyleSheet } from 'react-native';

import {
  colors,
  paddingHelpers
} from '../../config/styles';


export default StyleSheet.create({
  submitBtn: {
    marginTop: paddingHelpers.S,
    marginBottom: paddingHelpers.S,
    borderColor: colors.brandWhite
  },
  formItem: {
    borderBottomWidth: 2,
    borderBottomColor: colors.brandWhite
  },
  titleBarContent: {
    color: 'white',
    fontWeight: '600'
  },
  containerView: {
    marginTop: paddingHelpers.XS,
    marginBottom: paddingHelpers.XS,
    paddingHorizontal: paddingHelpers.N,
  }
});