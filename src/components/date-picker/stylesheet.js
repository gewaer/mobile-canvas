import {StyleSheet} from 'react-native';
import { colors } from '../../config/styles';

export default StyleSheet.create({
  dateTouch: {
    width: 142
  },
  dateTouchBody: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateIcon: {
    width: 32,
    height: 32,
    marginLeft: 5,
    marginRight: 5
  },
  dateInput: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateText: {
    marginLeft: 16,
    color: colors.brandBlack
  },
  placeholderText: {
    marginLeft: 0,
    color: colors.brandDarkGrey
  },
  datePickerMask: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: '#00000077'
  },
  datePickerCon: {
    backgroundColor: colors.brandWhite,
    height: 0,
    overflow: 'hidden'
  },
  btnText: {
    position: 'absolute',
    top: 0,
    height: 42,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnTextText: {
    fontSize: 16,
    color: colors.brandGreen
  },
  btnTextCancel: {
    color: 'red'
  },
  btnCancel: {
    left: 0
  },
  btnConfirm: {
    right: 0
  },
  datePicker: {
    marginTop: 42,
    borderTopColor: colors.brandDarkGrey,
    borderTopWidth: 0.5,
  },
  disabled: {
    backgroundColor: colors.brandGrey
  }
});
