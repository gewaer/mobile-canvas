// Importing package modules.
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import { Body, Icon, Text, ListItem, List } from 'native-base';
import { colors } from '@config/styles';
import { Navigation } from 'react-native-navigation';
import { pushDashboard, auth, pushSingleScreenAppWithSideMenu } from '@config/flows';
import StyleSheet from './stylesheet';
import { DASHBOARD, PROFILE_INFO, SETTINGS, SIDEMENU, WELCOME } from '..';

/*
	Screen Name: SideMenu.
	Description: Is declared as a screen but is used as a side menu component. This screen is used as a navigator.
*/
class SideMenu extends Component {

  constructor(props) {
    super(props)

    this.state = {
       menuObjects: [
         {
          text: 'Dashboard',
          iconType: 'MaterialIcons',
          iconName: 'dashboard',
          navigateTo: DASHBOARD
         },
         {
          text: 'My Profile',
          iconType: 'FontAwesome',
          iconName: 'user',
          navigateTo: PROFILE_INFO
         },
         {
          text: 'Settings',
          iconType: 'MaterialIcons',
          iconName: 'settings',
          navigateTo: SETTINGS
         }
       ]
    }
  }

  // Changes the active screen using redux.
  changeScreen(activeScreen) {
    if (this.props.activeScreen == activeScreen) {
      this.hideDrawer();
    } else if (activeScreen == DASHBOARD) {
      pushDashboard();
    } else {
      // Use Push Navigation to the app
      pushSingleScreenAppWithSideMenu(activeScreen);
    }
  }

  hideDrawer = () => {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: false
        }
      }
    });

    Navigation.mergeOptions(this.props.componentId, {
      bottomTabs: {
        currentTabIndex: 0
      }
    });
  };

  // Removes session data from the storage and changes to welcome scren
  async logOut() {
    try {
      AsyncStorage.removeItem('sessionData', () => {
        auth();
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View style={[StyleSheet.container, StyleSheet.navSectionStyle]}>
        <View>
          <View style={[StyleSheet.itemContainer,{ backgroundColor: colors.brandPrimary }]}>
            <TouchableOpacity  onPress={ () => {!this.props.isExpired && this.changeScreen('profile')}}>
              <Icon type={'Ionicons'} name={'ios-contact'} style={{ color: 'white',  fontSize: 48, marginRight: 12, marginBottom: -9}} />
            </TouchableOpacity>
            <View style={ StyleSheet.userDataContainer }>
              <Text style={ StyleSheet.title }>Joanne Doe</Text>
              <Text style={ StyleSheet.subTitle }>{
                this.props.company ? this.props.company.name : 'Familia no disponible'
              }</Text>
            </View>
          </View>
          <ScrollView style={{ paddingTop: 10 }}>
            <List>
              {
                this.state.menuObjects.map((element) => {
                  return(
                    <ListItem key={ element.text }  style={StyleSheet.listItemDarkBorder} onPress={() => this.changeScreen(element.navigateTo)}>
                      <View style={{ width: 30, alignItems: 'center' }}>
                        <Icon type={element.iconType}  name={element.iconName} style={{ fontSize: 18, color: colors.brandPrimaryAlter }}/>
                      </View>
                      <Body>
                        <View style={StyleSheet.navSectionStyle}>
                          <Text style={StyleSheet.navItemStyle}>{ element.text }</Text>
                        </View>
                      </Body>
                    </ListItem>
                  )
                })
              }
              <ListItem  style={ StyleSheet.menuMiddleBar }  >
                <Body>
                  <Text style={StyleSheet.menuMiddleBarText}>Configurations</Text>
                </Body>
              </ListItem>
              <ListItem style={StyleSheet.listItemDarkBorder} onPress={() => this.logOut()}>
                <View style={{ width: 30, alignItems: 'center' }}>
                  <Icon type={'MaterialCommunityIcons'} name={'logout-variant'} style={{ fontSize: 18, color: colors.brandPrimaryAlter }}/>
                </View>
                <Body>
                  <View style={StyleSheet.navSectionStyle}>
                    <Text style={StyleSheet.navItemStyle}>Log out</Text>
                  </View>
                </Body>
              </ListItem>
            </List>
          </ScrollView>
        </View>
      </View>
    );
  }
}

// Maps redux's state variables to this class' props
const mapStateToProps = state => {
  return {
    company: state.session.company
  };
};

// Connects redux actions to this class' props
export default connect(
  mapStateToProps,
  {}
)(SideMenu);
