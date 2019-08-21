/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Platform,
  BackHandler
} from 'react-native';

import {
  Button,
  Text,
  Icon,
  List,
  ListItem,
  Right,
  Body,
  Content,
  Container,
  Spinner,
  Switch,
  Picker,
  Item
} from 'native-base';

import { changeActiveScreen } from '../../modules/Session';
import { connect } from 'react-redux';
const platform = Platform.OS;
import TitleBar from '../../components/title-bar'

import StyleSheet from './stylesheet';

import { Navigation } from 'react-native-navigation';
import { SIDEMENU } from '..';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      selected2: undefined
    };
  }

  componentDidMount() {
    this.setState({ isLoading: false });
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
  }

  backAndroid() {
    this.changeScreen('dashboard');
    return true;
  }

  changeScreen(activeScreen) {
    this.props.changeActiveScreen({ activeScreen });
  }

  showDrawer = () => {
    Navigation.mergeOptions(SIDEMENU, {
      sideMenu: {
        left: {
          visible: true
        }
      }
    });
  };

  titleBarLeft() {
    return {
      content: (
        <View style={StyleSheet.titleBarContent}>
          <Button
            transparent
            onPress={() =>
              this.showDrawer()
            }
          >
            <Icon
              type={'MaterialIcons'}
              name={'menu'}
              style={{ color: '#fff', fontSize: 22 }}
            />
          </Button>
        </View>
      )
    };
  }

  openAddCardModal() {
    this.props.navigator.push({
      screen: 'dac.EditSettings',
      passProps: {
        cardCreationAction: this.getUserCards
      },
      navigatorStyle: {
        navBarHidden: true,
        tabBarHidden: true
      }
    });
  }

  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Container>
          <TitleBar left={this.titleBarLeft()} body={titleBarbody} />
          <Content>
            <View style={{ margin: 'auto' }}>
              <Spinner />
            </View>
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <TitleBar left={this.titleBarLeft()} body={titleBarbody} />
          <Content>
            <View style={StyleSheet.positionR}>
              <List>
                <ListItem style={[StyleSheet.listItem]}>
                  <Body>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: '600', marginLeft: 0 }}>
                        Enable Push Notifications
                      </Text>
                    </View>
                  </Body>
                  <Right>
                    <Switch value={false} />
                  </Right>
                </ListItem>
                <ListItem style={[StyleSheet.listItem]}>
                  <Body>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: '600', marginLeft: 0 }}>
                        Language
                      </Text>
                    </View>
                  </Body>
                  <Right>
                    <Item picker style={{ borderBottomWidth: 0 }}>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="English"
                        placeholderStyle={{ color: '#111' }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.selected2}
                        onValueChange={this.onValueChange2.bind(this)}
                      >
                        <Picker.Item label="Ingles" value="key1" />
                      </Picker>
                    </Item>
                  </Right>
                </ListItem>
              </List>
            </View>
          </Content>
        </Container>
      );
    }
  }
}

const titleBarbody = {
  content: (
    <View style={StyleSheet.titleBarContent}>
      <Text style={{ color: '#fff', paddingLeft: platform === 'ios' ? 0 : 10, fontSize: platform === 'ios' ? 18 : 19.64 }}>
        Settings
      </Text>
    </View>
  )
};

const mapStateToProps = state => {
  return {
    token: state.session.token,
    user: state.session.user,
    selectedCompanyId: state.session.selectedCompanyId,
    company: state.session.company
  };
};

export default connect(mapStateToProps, {
  changeActiveScreen
})(Settings);
