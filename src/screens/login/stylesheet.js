import { StyleSheet } from 'react-native';

import {
  colors,
  paddingHelpers
} from '../../config/styles';


export default StyleSheet.create({
  linkBTN: {
    color: colors.brandWhite,
    textDecorationLine: 'underline'
  },
  submitBtn: {
    marginTop: paddingHelpers.S,
    marginBottom: paddingHelpers.S,
    borderColor: colors.brandWhite
  },
  googleBtn: {
    backgroundColor: colors.gmail,
    width: '70%',
    alignSelf: 'center'
  },
  googleText: {
    color: '#fff',
    textAlign: 'center',
    width: '100%'
  },
  facebookBtn: {
    marginTop: paddingHelpers.S,
    marginBottom: paddingHelpers.XS,
    backgroundColor: colors.facebook,
    width: '70%',
    alignSelf: 'center'
  },
  facebookText: {
    color: '#fff',
    textAlign: 'center',
    width: '100%'
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
  },
  containerViewBack: {
    flexGrow: 1,
    marginTop: paddingHelpers.XS,
    marginBottom: paddingHelpers.XS,
    paddingVertical: paddingHelpers.N,
    backgroundColor: colors.brandWhite,
    alignItems: 'center',
    paddingHorizontal: paddingHelpers.N,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'transparent'
  }
});
