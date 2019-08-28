/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  BackHandler
} from 'react-native';

import {
  Button,
  Item,
  Label,
  Input,
  Text,
  Icon,
  Content,
  Container,
  Root,
  Toast,
  Thumbnail
} from 'native-base';

import { colors } from '../../config/styles';
import { connect } from 'react-redux';
import moment from 'moment';

import TitleBar from '../../components/title-bar';

const platform = Platform.OS;

import { Navigation } from 'react-native-navigation';

import { popScreen } from "@utils/nav";

import StyleSheet from './stylesheet';
import { DASHBOARD, EDIT_LEADS } from '..';

class ItemInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {},
      itemSettings: {
        fields: [
          {
            name: 'firstname',
            key: 'firstname',
            type: 'text'
          },
          {
            name: 'lastname',
            key: 'lastname',
            type: 'text'
          },
          {
            name: 'email',
            key: 'email',
            type: 'text'
          },
          {
            name: 'phone',
            key: 'phone',
            type: 'phone'
          },
          {
            name: 'creation date',
            key: 'created_at',
            type: 'date'
          }
        ]
      }
    };
  }

  componentDidMount() {
    this.setState({ item: this.props.item });
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());

    if (this.props.itemUpdated) {
      Toast.show({
        text: 'Item successfully updated!',
        buttonText: 'Ok',
        duration: 3000,
        type: 'success'
      });
    }
  }

  backAndroid() {
    popScreen(this.props.componentId);
    return true;
  }

  changeToEditScreen() {
    Navigation.push(this.props.componentId, {
      component: {
        name: EDIT_LEADS,
        passProps: {
          item: this.state.item
        },
        options: {
          topBar: {
            visible: false
          }
        }
      }
    });
  }

  formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }

  capitalizeFirstLetter(str) {
    var pieces = str.split(' ');
    for (var i = 0; i < pieces.length; i++) {
      var j = pieces[i].charAt(0).toUpperCase();
      pieces[i] = j + pieces[i].substr(1);
    }
    return pieces.join(' ');
  }

  titleBarbody() {
    return {
      content: (
        <View style={StyleSheet.titleBarContent}>
          <Text
            style={{
              color: '#fff',
              paddingLeft: platform === 'ios' ? 0 : 10,
              fontSize: platform === 'ios' ? 18 : 19.64
            }}
          >
            {this.props.item.firstname && this.props.item.firstname}{' '}
            {this.props.item.lastname && this.props.item.lastname}
          </Text>
        </View>
      )
    };
  }

  titleBarLeft() {
    return {
      content: (
        <View style={StyleSheet.titleBarContent}>
          <Button transparent onPress={() => popScreen(this.props.componentId)}>
            <Icon
              type={'MaterialIcons'}
              name={'chevron-left'}
              style={{ color: '#fff', fontSize: platform === 'ios' ? 22 : 24 }}
            />
          </Button>
        </View>
      )
    };
  }

  titleBarRight() {
    return {
      content: (
        <View style={StyleSheet.titleBarContent}>
          <TouchableOpacity
            onPress={() => {
              this.changeToEditScreen();
            }}
          >
            <Text
              style={{
                color: '#fff',
                paddingLeft: 0,
                fontSize: 16,
                textAlign: 'right'
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      )
    };
  }

  getImageCover() {
    return 'https://banner2.kisspng.com/20180406/sve/kisspng-computer-icons-user-material-design-business-login-dizzy-5ac7f1c61041c2.5160856515230529980666.jpg';
  }

  getField(type, value) {
    if (!value) {
      return <Input style={StyleSheet.formInput} value={'N/A'} disabled />;
    }

    switch (type) {
    case 'text':
      return <Input style={StyleSheet.formInput} value={value} disabled />;
    case 'date':
      return (
        <Input
          style={StyleSheet.formInput}
          value={moment(value).format('MM/DD/YYYY')}
          disabled
        />
      );
    case 'phone':
      return (
        <Input
          style={StyleSheet.formInput}
          value={this.formatPhoneNumber(value)}
          disabled
        />
      );
    }
  }

  render() {
    return (
      <Container>
        <Root>
          <TitleBar
            left={this.titleBarLeft()}
            body={this.titleBarbody()}
            right={this.titleBarRight()}
          />
          <Content padder>
            <View>
              <View style={StyleSheet.container}>
                <Thumbnail
                  source={{ uri: this.getImageCover() }}
                  style={StyleSheet.companyLogo}
                  resizeMode="cover"
                />
              </View>
            </View>
            <View style={StyleSheet.positionR}>
              {this.state.itemSettings.fields.map((item, index) => {
                return (
                  <Item stackedLabel style={StyleSheet.formItem} key={index}>
                    <Label
                      style={[
                        StyleSheet.formLabel,
                        { fontSize: 12, color: colors.brandBlack }
                      ]}
                    >
                      {this.capitalizeFirstLetter(item.name)}
                    </Label>
                    {this.getField(item.type, this.state.item[item.key])}
                  </Item>
                );
              })}
            </View>
          </Content>
        </Root>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.session.user
  };
};

export default connect(
  mapStateToProps,
  {}
)(ItemInfo);
