import { StyleSheet } from 'react-native';

import {
  colors,
  paddingHelpers
} from '../../config/styles';


export default StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.brandWhite
  },
  container: {
    flexShrink: 1,
    backgroundColor: colors.brandSecondary,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtomsContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: paddingHelpers.N,
    paddingTop: paddingHelpers.N,
    backgroundColor: colors.brandWhite
  },
  btnTextStyle: {
    fontSize: 16,
    color: '#fff'
  }
});