import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "../../config/styles";
// Responsive Const
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const isIphoneX =
  platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
export default StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    backgroundColor:'black'
  },
  coverImage: {
    width:150,
    height:150,
    marginBottom:15,
    alignSelf:'center'
  },
  topContainer: {
    flexDirection:'row',
    justifyContent:'center',
    marginVertical:15
  },
  bottomContanier: {
    marginVertical:15,
    marginHorizontal:15,
    flexDirection:'row'
  },
  jumpIconContainer: {
    justifyContent:'center'
  },
  jumpIcon: {
    width:30, height:30
  },
  jumpLabel: {
    position:'absolute',
    alignSelf:'center',
    marginTop:1,
    color:'white',
    fontSize:12
  },
  playPauseContainer: {
    marginHorizontal:20
  },
  slider: {
    flex:1,
    alignSelf:'center',
    marginHorizontal:Platform.select({ios:5})
  },
  sliderLabel: {
    color:'white',
    alignSelf:'center'
  }
});
