import { StyleSheet } from 'react-native';

import {
  colors,
  paddingHelpers
} from '../../config/styles';


export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButton: {
    backgroundColor: colors.brandGreen,
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
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
  formItem: {
    marginTop: 10
  }
});
