import { StyleSheet } from 'react-native';

import {
  colors,
  paddingHelpers
} from '../../config/styles';


export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background
  },
  actionBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: paddingHelpers.XL,
    paddingHorizontal: paddingHelpers.S
  },
  main: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.headerText,
    fontWeight: '400',
    fontStyle: 'italic'
  },
  titleBarContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewBar: {
    backgroundColor: colors.brandGreen,
    alignItems: 'center',
    padding: paddingHelpers.N
  },
  textHeading: {
    color: colors.brandWhite,
    fontWeight: '900',
    fontSize: 22,
    letterSpacing: 4
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.buttonBackground,
    margin: 5
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500'
  },
  listItem: {
    marginLeft: 0,
    padding: paddingHelpers.S
  },
  dataTextTitle: {
    fontSize: 25,
    fontWeight: '900',
    color: colors.brandBlack
  },
  dataTextSubTitle: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '900',
    color: colors.brandGold,
    maxWidth: 160
  },
  dataTextLabel: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.brandDarkGrey,
    position: 'absolute',
    right: 0,
    alignSelf: 'flex-end'
  },
  dataTextInfo: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.brandBlueDisabled
  },
  marginFix: {
    marginLeft: paddingHelpers.N
  },
  textContainer: {
    flexDirection: 'row'
  },
  progressStyle: {
    borderRadius: 3,
    borderWidth: 0
  },
  addBtn: {
    marginTop: paddingHelpers.S,
    marginBottom: paddingHelpers.XS,
    backgroundColor: colors.brandGreen,
    width: '100%',
    alignItems: 'center'
  },
  btnContainer: {
    marginTop: paddingHelpers.N,
    marginHorizontal: paddingHelpers.S
  }
});
