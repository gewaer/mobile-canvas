import { StyleSheet, Platform } from 'react-native';
import {
  colors,
  paddingHelpers
} from '../../config/styles';
const platform = Platform.OS;


export default StyleSheet.create({
  linkBTN: {
    color: colors.brandPrimary,
    textDecorationLine: 'underline'
  },
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
  title: {
    color: colors.brandPrimary,
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center'
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
  },
  buttonText: {
    color: colors.brandWhite,
    fontWeight: 'bold',
    fontSize: 10
  }
});
