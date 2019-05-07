// Importing package modules.
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  ScrollView,
  View,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import { Body, Icon, Text, ListItem, List, Right } from 'native-base';

// Importing local assets and components.
import { paddingHelpers, colors } from '../../config/styles';

// Importing Redux's actions
import { changeActiveScreen } from '../../actions/SessionActions';

import { Navigation } from 'react-native-navigation';

import {
  pushSingleScreenAppWithSideMenu,
  pushDashboard,
  pushSingleScreenApp
} from '../../navigation/flows';

import StyleSheet from './stylesheet';

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
          navigateTo: 'canvas.Dashboard'
         },
         {
          text: 'My Profile',
          iconType: 'FontAwesome',
          iconName: 'user',
          navigateTo: 'canvas.Profile'
         },
         {
          text: 'Settings',
          iconType: 'MaterialIcons',
          iconName: 'settings',
          navigateTo: 'canvas.Settings'
         }
       ]
    }
  }

  // Changes the active screen using redux.
  changeScreen(activeScreen) {
    if (this.props.activeScreen == activeScreen) {
      this.hideDrawer();
    } else if (activeScreen == 'canvas.Dashboard') {
      pushDashboard({ activeScreen: 'canvas.Dashboard' });
    } else {
      pushSingleScreenAppWithSideMenu(activeScreen, {}, { activeScreen });
    }
  }

  hideDrawer = () => {
    Navigation.mergeOptions('navigation.drawer.left', {
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

  // Changes to dashboard
  changeToDashboard = () => {
    if (this.props.activeScreen == 'canvas.Dashboard') {
      this.hideDrawer();
    } else {
      pushDashboard({ activeScreen: 'canvas.Dashboard' });
    }
  };

  // Removes session data from the storage and changes to welcome scren
  async logOut() {
    try {
      AsyncStorage.removeItem('sessionData', () => {
        this.props.changeActiveScreen({ activeScreen: 'welcome' });
        pushSingleScreenApp('canvas.Welcome', {});
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View style={[StyleSheet.container, StyleSheet.navSectionStyle]}>
        <View>
          <View style={[ StyleSheet.itemContainer, { backgroundColor: colors.brandPrimary }]}>
            <TouchableOpacity
              //onPress={ () => { !this.props.isExpired && this.changeScreen('profile') } }
            >
              <Icon type={'Ionicons'} name={'ios-contact'} style={ { color: 'white',  fontSize: 48, marginRight: 12, marginBottom: -9} } />
            </TouchableOpacity>
            <View style={ StyleSheet.userDataContainer }>
              <Text style={ StyleSheet.title }>Joanne Doe</Text>
              <Text style={ StyleSheet.subTitle }>{
                this.props.company
                  ? this.props.company.name
                  : 'Familia no disponible'
              }</Text>
            </View>
          </View>
          <ScrollView style={{ paddingTop: 10 }}>
            <List>
              {
                this.state.menuObjects.map((element) => {
                  return(
                    <ListItem
                      key={ element.id }
                      style={StyleSheet.listItemDarkBorder}
                      onPress={() => this.changeScreen(element.navigateTo)}
                    >
                      <View style={{ width: 30, alignItems: 'center' }}>
                        <Icon
                          type={ element.iconType }
                          name={ element.iconName }
                          style={{ fontSize: 18, color: colors.brandPrimaryAlter }}
                        />
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
              <ListItem
                style={ StyleSheet.menuMiddleBar }
              >
                <Body>
                  <Text style={StyleSheet.menuMiddleBarText}>Configurations</Text>
                </Body>
              </ListItem>
              <ListItem
                style={StyleSheet.listItemDarkBorder}
                onPress={() => this.logOut()}
              >
                <View style={{ width: 30, alignItems: 'center' }}>
                  <Icon
                    type={ 'MaterialCommunityIcons' }
                    name={ 'logout-variant' }
                    style={{ fontSize: 18, color: colors.brandPrimaryAlter }}
                  />
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
  {
    changeActiveScreen
  }
)(SideMenu);
