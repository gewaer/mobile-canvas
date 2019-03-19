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
          <View
            style={{
              paddingVertical: paddingHelpers.S,
              backgroundColor: colors.brandSecondary
            }}
          />
          <ScrollView style={{ paddingTop: paddingHelpers.N }}>
            <List>
              <ListItem style={StyleSheet.listItemDarkBorder}>
                <Body style={{ flexGrow: 2 }}>
                  <View
                    style={[StyleSheet.navSectionStyle, { paddingLeft: 0 }]}
                  >
                    <Text
                      style={[
                        {
                          paddingLeft: 0,
                          marginLeft: 0,
                          marginRight: 0,
                          color: colors.brandBlack,
                          fontSize: 18,
                          fontWeight: '900'
                        }
                      ]}
                    >
                      {this.props.company
                        ? this.props.company.name
                        : 'Familia no disponible'}
                    </Text>
                  </View>
                </Body>
                <Right style={{ flexGrow: 1 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.brandGold,
                      borderRadius: 3,
                      padding: 5
                    }}
                    onPress={() => this.changeScreen('canvas.Dashboard')}
                  >
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: '900'
                      }}
                      t
                    >
                      Change
                    </Text>
                  </TouchableOpacity>
                </Right>
              </ListItem>
              <ListItem
                style={StyleSheet.listItemDarkBorder}
                onPress={() => this.changeScreen('canvas.Dashboard')}
              >
                <View style={{ width: 30, alignItems: 'center' }}>
                  <Icon
                    type={'MaterialIcons'}
                    name={'dashboard'}
                    style={{ fontSize: 22 }}
                  />
                </View>
                <Body>
                  <View style={StyleSheet.navSectionStyle}>
                    <Text style={StyleSheet.navItemStyle}>Dashboard</Text>
                  </View>
                </Body>
              </ListItem>
              <ListItem
                style={StyleSheet.listItemDarkBorder}
                onPress={() => this.changeScreen('canvas.Profile')}
              >
                <View style={{ width: 30, alignItems: 'center' }}>
                  <Icon
                    type={'FontAwesome'}
                    name={'user'}
                    style={{ fontSize: 22 }}
                  />
                </View>
                <Body>
                  <View style={StyleSheet.navSectionStyle}>
                    <Text style={StyleSheet.navItemStyle}>My Profile</Text>
                  </View>
                </Body>
              </ListItem>
              <ListItem
                style={StyleSheet.listItemDarkBorder}
                onPress={() => this.changeScreen('canvas.Settings')}
              >
                <View style={{ width: 30, alignItems: 'center' }}>
                  <Icon
                    type={'MaterialIcons'}
                    name={'settings'}
                    style={{ fontSize: 22 }}
                  />
                </View>
                <Body>
                  <View style={StyleSheet.navSectionStyle}>
                    <Text style={StyleSheet.navItemStyle}>Settings</Text>
                  </View>
                </Body>
              </ListItem>
            </List>
            <View style={{ marginTop: paddingHelpers.XL3 }}>
              <List>
                <ListItem style={StyleSheet.listItemNoBorder}>
                  <Body>
                    <View
                      style={[
                        StyleSheet.navSectionStyle,
                        { paddingLeft: 0 }
                      ]}
                    >
                      <TouchableOpacity onPress={() => this.logOut()}>
                        <Text
                          style={{
                            paddingLeft: 0,
                            marginLeft: 0,
                            marginRight: 0
                          }}
                        >
                          Log Out
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Body>
                  <Right>
                    <Icon
                      onPress={() => this.logOut()}
                      type={'MaterialCommunityIcons'}
                      name={'logout-variant'}
                      style={{ color: colors.brandBlack }}
                    />
                  </Right>
                </ListItem>
              </List>
            </View>
          </ScrollView>
        </View>
        <View style={[StyleSheet.footerContainer, StyleSheet.footer]} />
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
