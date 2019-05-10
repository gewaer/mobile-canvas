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
  submitBtnInv: {
    marginTop: paddingHelpers.S,
    marginBottom: paddingHelpers.S,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.brandPrimary,
    height: 48,
    borderRadius: 3,
    backgroundColor: 'white'
  },
  googleBtn: {
    marginTop: paddingHelpers.S,
    marginBottom: paddingHelpers.S,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.gmail,
    height: 48,
    borderRadius: 3,
    backgroundColor: 'white'
  },
  googleText: {
    color: colors.gmail,
    fontWeight: 'bold',
    fontSize: 12
  },
  facebookBtn: {
    marginTop: paddingHelpers.S,
    marginBottom: paddingHelpers.S,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    height: 48,
    borderRadius: 3,
    backgroundColor: colors.facebook
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
    fontSize: 12
  },
  buttonTextPrimary: {
    color: colors.brandPrimary,
    fontWeight: 'bold',
    fontSize: 12
  },
  textLabel: {
    color: colors.brandPrimary,
    alignSelf: 'center',
    fontSize: 12,
    marginTop: 20,
    marginBottom: 5
  },
  topContainerView: {
    paddingTop: 35,
    paddingBottom: 80
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
