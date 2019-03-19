import { StyleSheet } from 'react-native';

import {
  colors,
  paddingHelpers
} from '../../config/styles';


export default StyleSheet.create({
  linkBTN: {
    color: colors.brandGreen,
    textDecorationLine: 'underline'
  },
  submitBtn: {
    marginTop: paddingHelpers.S,
    marginBottom: paddingHelpers.S,
    borderColor: colors.brandWhite
  },
  googleBtn: {
    backgroundColor: colors.gmail,
  },
  googleText: {
    color: '#fff'
  },
  facebookBtn: {
    marginTop: paddingHelpers.S,
    marginBottom: paddingHelpers.XS,
    backgroundColor: colors.facebook,
  },
  facebookText: {
    color: '#fff'
  },
  formItem: {
    borderBottomWidth: 0.5,
  },
  titleBarContent: {
    color: colors.brandGreen,
    fontWeight: '600'
  },
  containerView: {
    marginTop: paddingHelpers.XS,
    marginBottom: paddingHelpers.XS,
  },
  containerViewBack: {
    flexGrow: 1,
    marginTop: paddingHelpers.XS,
    marginBottom: paddingHelpers.XS,
    paddingVertical: paddingHelpers.N,
    backgroundColor: colors.brandGreen,
    alignItems: 'center',
  },
  btnContainer: {
    width: 280
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'transparent'
  }
});