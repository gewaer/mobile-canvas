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
  Spinner,
  Root,
  Toast,
  Thumbnail
} from 'native-base';

import { colors } from '../../config/styles';
import { connect } from 'react-redux';
import moment from 'moment';

import TitleBar from '../../components/title-bar';
import StyleSheet from './stylesheet';

const platform = Platform.OS;

import { Navigation } from 'react-native-navigation';

import { pushDashboard } from '../../config/flows';

class CompanyInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      company: {}
    };
  }

  componentWillMount() {
    this.setState({
      company: this.props.family
    });
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());

    if (this.props.companyUpdated) {
      Toast.show({
        text: 'Company successfully updated!',
        buttonText: 'Ok',
        duration: 3000,
        type: 'success'
      });
    }
  }

  backAndroid() {
    this.changeScreen();
    return true;
  }

  changeScreen() {
    pushDashboard({ activeScreen: 'canvas.Dashboard' });
  }

  changeToEditScreen() {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'canvas.EditCompany',
        passProps: {
          company: this.state.company
        },
        options: {
          topBar: {
            visible: false
          }
        }
      }
    });
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
            {this.props.family.name}
          </Text>
        </View>
      )
    };
  }

  titleBarLeft() {
    return {
      content: (
        <View style={StyleSheet.titleBarContent}>
          <Button transparent onPress={() => this.changeScreen()}>
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
    return this.state.company.profile_image ?
      this.state.company.profile_image
      :
      'https://d3bza9ldbeb18h.cloudfront.net/assets/placeholder-company-b9d0a167b1f7460768517d115285de2337c6e2a84f4285617722efa587c693fc.png';
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Container>
          <Root>
            <TitleBar left={this.titleBarLeft()} body={this.titleBarbody()} />
            <Content>
              <View style={{ margin: 'auto' }}>
                <Spinner />
              </View>
            </Content>
          </Root>
        </Container>
      );
    } else {
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
                <Item stackedLabel style={StyleSheet.formItem}>
                  <Label
                    style={[
                      StyleSheet.formLabel,
                      { fontSize: 12, color: colors.brandBlack }
                    ]}
                  >
                    Name
                  </Label>
                  <Input
                    style={StyleSheet.formInput}
                    value={this.state.company.name}
                    disabled
                  />
                </Item>
                <Item stackedLabel style={StyleSheet.formItem}>
                  <Label
                    style={[
                      StyleSheet.formLabel,
                      { fontSize: 12, color: colors.brandBlack }
                    ]}
                  >
                    Website
                  </Label>
                  <Input
                    style={StyleSheet.formInput}
                    value={
                      this.state.company.website
                        ? this.state.company.website
                        : 'N/A'
                    }
                    disabled
                  />
                </Item>
                <Item stackedLabel style={StyleSheet.formItem}>
                  <Label
                    style={[
                      StyleSheet.formLabel,
                      { fontSize: 12, color: colors.brandBlack }
                    ]}
                  >
                    Creation Date
                  </Label>
                  <Input
                    style={StyleSheet.formInput}
                    value={moment(this.state.company.created_at).format(
                      'MM/DD/YYYY'
                    )}
                    disabled
                  />
                </Item>
              </View>
            </Content>
          </Root>
        </Container>
      );
    }
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
)(CompanyInfo);
