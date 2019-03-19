import { StyleSheet } from 'react-native';

import {
  colors
} from '../../config/styles';


export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleBarContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.buttonBackground,
    margin: 5
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: '500'
  },
  formItem: {
    marginTop: 10
  }
});
