import { Platform, Dimensions } from 'react-native';
// Responsive Const
const deviceHeight = Dimensions.get('window').height;
const platform = Platform.OS;

export const globalStyle = {
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 8,
    marginBottom: 30
  },
  logoBig: {
    width: 280,
    height: 300
  },
  logoTag: {
    width: 280,
    height: 100
  },
  text: {
    color: '#D8D8D8',
    bottom: 6,
    marginTop: 5
  },
  // For Views
  containerView: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  // Welcome Inputs
  formLabel: {
    color: '#61C2CC',
    marginTop: 12,
    marginBottom: 8,
    fontSize: 14
  },
  formInput: {
    height: 30,
    color: 'black',
    top: 0
  },
  pickerIcon: {
    paddingTop: 0,
    marginTop: -4,
    marginLeft: 0,
    marginRight: 12
  }
};

export const colors = {
  brandPrimary: '#61C2CC',
  brandPrimaryAlter: '#1F9AA7',
  brandPrimaryAlterTrans: 'rgba(31, 154, 168, 0.6)',
  brandSecondary: '#AAE6E2',
  bradSecondaryAlter: '#7f7f7f',
  deleteColor: '#F55753',
  background: '#F5F2F9',
  errorText: '#FA3256',
  headerText: '#444444',
  buttonBackground: '#39BD98',
  buttonText: '#FFFFFF',
  inputBackground: '#FFFFFF',
  inputDivider: '#E4E2E5',
  // Brand Colors
  brandBlueDisabled: '#75BFB5',
  brandGreenDisabled: '#75BFB5',
  brandGreenDeep: '#12776b',
  brandWhite: '#ededed',
  brandBlack: '#1c1d1d',
  brandGrey: '#c2c1c0',
  brandLightGray: '#EAEAEA',
  brandDarkGrey: '#5A5A5A',
  brandGreen: '#189687',
  brandGold: '#f1ac2f',
  brandGoldDisable: '#f1ac2f',
  normalWhite: '#ffffff',
  facebook: '#3b5998',
  gmail: '#CD5644'
};
// HELPERS
// Padding-Margins
export const paddingHelpers = {
  XS: platform === 'ios' ? 6 : 8,
  S: platform === 'ios' ? 14 : 16,
  N: platform === 'ios' ? 22 : 24,
  LG: platform === 'ios' ? 24 : 26,
  XL: platform === 'ios' ? 26 : 28,
  XL2: platform === 'ios' ? 28 : 30,
  XL3: platform === 'ios' ? 30 : 32,
  XL4: platform === 'ios' ? 32 : 34,
};

export const titleBarStyles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.headerText,
    fontWeight: '400',
    fontStyle: 'italic'
  },
  titleBarContent: {
    color: 'white',
    fontWeight: '900',
  }
};

export const ImgDimensions = {
  DrawerIcons: {
    width: 25,
    height: 25,
  }

};

export const ListStyles = {
  listItem: {
    marginLeft: 0,
    padding: paddingHelpers.S,
    borderColor: colors.brandBlueDisabled,
    borderBottomWidth: 1
  },
  listItemNoBorder: {
    marginLeft: 0,
    padding: paddingHelpers.S,
    borderBottomWidth: 0
  },
  listItemDarkBorder: {
    marginLeft: 0,
    padding: paddingHelpers.S,
    borderColor: 'rgba(17, 17, 17, 0.4)',
    borderBottomWidth: 0.3
  }
};

export const buttonStyles = {
  roundIconBtn: {
    width: 35,
    height: 35,
    borderColor: colors.brandGreen,
    borderStyle: 'solid',
    borderWidth: 1.3,
    borderRadius: 100 / 2,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  roundIconThumb: {
    width: 46,
    height: 46,
    borderColor: colors.brandBlueDisabled,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 100 / 2,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeIcon: {
    backgroundColor: colors.brandBlueDisabled,
    width: undefined,
    height: undefined,
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    marginTop: -18,
  },
  badgeStatus: {
    width: 10,
    height: 10,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    marginLeft: 10,
    position: 'absolute',
    top: 6

  },
  roundArrow: {
    width: 35,
    height: 35,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

};
