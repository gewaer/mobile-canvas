import { Platform} from 'react-native';
import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';
const platform = Platform.OS;

export default StyleSheet.create({
  bar: {
    backgroundColor: colors.brandSecondary,
    paddingTop: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  barContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingBottom: platform === 'ios' ? 0 : 20, 
  },
  titleBarLeft: {
    flexShrink: 1,
    justifyContent: 'center',
    alignContent: 'flex-start',
  },
  titleBarBody: {
    flexGrow: 3,
    justifyContent: 'center',
    alignContent: 'center',
    width: 200,
    alignSelf: 'center',
  },
  titleBarRight: {
    flexShrink: 1,
    justifyContent: 'center',
    alignContent: 'flex-end'
  },
  bodyText: {
    color: 'white',
  }
});