import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

// Responsive Const
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  // Cover
  drawerCover: {
    alignSelf: 'stretch',
    height: deviceHeight / 3.5,
    width: null,
    position: 'relative',
    marginBottom: 10
  },
  drawerImage: {
    position: 'absolute',
    left: Platform.OS === 'android' ? deviceWidth / 10 : deviceWidth / 9,
    top: Platform.OS === 'android' ? deviceHeight / 13 : deviceHeight / 12,
    width: 210,
    height: 75,
    resizeMode: 'cover'
  },
  text: {
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === 'ios' ? 13 : 11,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? -3 : undefined
  },
  // Sidebar Styles
  container: {
    flex: 1,
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0
  },
  navItemStyle: {
    padding: 10,
    color: '#5A5A5A',
    fontSize: 14
    // fontFamily: "Akkurat-Bold",
  },
  navSectionStyle: {
    backgroundColor: 'white'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.brandDarkGrey
  },
  // header Style
  userImage: {
    width: 50,
    height: 50,
    marginHorizontal: 15
  },
  foregroundContainer: {
    width: 300,
    height: 140
  },
  logoutButton: {
    position: 'absolute',
    top: 60,
    right: 15
  },
  userInfoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // For bg colors
  darkerColor: {
    backgroundColor: '#1E2A39'
  },
  footer: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 1
  },
  itemContainer: {
    borderBottomWidth: 0.6,
    borderBottomColor: "#707070",
    paddingBottom: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    paddingTop: 25
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  },
  subTitle: {
    color: '#1F9AA7',
    fontSize: 12,
    fontStyle: 'italic'
  },
  listItemDarkBorder: {
    marginLeft: 0,
    paddingLeft: 16,
    paddingTop: 0,
    paddingBottom: 0,
    height: 40
  },
  userDataContainer: {
    marginTop: 10,
    justifyContent: 'center'
  },
  menuMiddleBar: {
    marginLeft: 0,
    paddingLeft: 16,
    paddingTop: 0,
    paddingBottom: 0,
    height: 35,
    backgroundColor: colors.brandPrimary
  },
  menuMiddleBarText: {
    padding: 10,
    color: 'white',
    fontSize: 14,
    fontSize: 12
  }
});
