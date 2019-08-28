import { StyleSheet } from 'react-native';

import {
  colors,
  paddingHelpers
} from '../../config/styles';


export default StyleSheet.create({
  submitBtn: {
    marginTop: paddingHelpers.S,
    marginBottom: paddingHelpers.S,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    height: 48,
    borderRadius: 3,
    backgroundColor: colors.brandPrimary
  },
  formItem: {
    borderBottomColor: colors.brandWhite,
    marginTop: 0,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 3,
    borderBottomColor: colors.brandPrimary,
    borderColor: colors.brandPrimary
  },
  titleBarContent: {
    color: 'white',
    fontWeight: '600'
  },
  containerView: {
    marginTop: paddingHelpers.XS,
    marginBottom: paddingHelpers.XS,
    paddingHorizontal: paddingHelpers.N,
  },
  title: {
    color: colors.brandPrimary,
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center'
  },
  buttonText: {
    color: colors.brandWhite,
    fontWeight: 'bold',
    fontSize: 12
  },
  textLabel: {
    color: colors.brandPrimary,
    alignSelf: 'center',
    fontSize: 11,
    marginBottom: 10
  },
  textLabelContainer: {
    marginTop: 25
  }
});
