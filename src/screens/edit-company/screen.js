// Importing package modules.
import React, { Component } from 'react';
import { connect } from 'react-redux';
const axios = require('../../../src/config/axios');

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

// Importing local assets and components.
import { colors } from '../../config/styles';
import { API_KEY } from 'react-native-dotenv';
import TitleBar from '../../components/title-bar';

// Importing Redux's actions
import { changeActiveCompany } from '../../actions/SessionActions';

// Gets the operating system's name where the app is running (Android or iOS).
const platform = Platform.OS;

import StyleSheet from './stylesheet';

import { Navigation } from 'react-native-navigation';

/*
	Screen Name: Edit Company.
	Description: This screen is used to edit a company's information.
*/
class EditCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: '',
      companyWebsite: '',
      isLoading: false,
      company: {}
    };
  }

  componentWillMount() {
    this.setState({
      companyName: this.props.company.name,
      companyWebsite: this.props.company.website
        ? this.props.company.website
        : '',
      company: this.props.company
    });
  }

  componentDidMount() {
    // Creates an event listener for Android's back button.
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
  }

  // Handles Android's back button's action.
  backAndroid() {
    this.changeScreen();
    return true;
  }

  // Verifies if all required fields are filled.
  canEdit() {
    return this.state.companyName.length && this.state.companyWebsite.length;
  }

  // Changes screnn to company profile.
  // <param> companyUpdated: A flag that tells if the company was updated.
  // <param> newCompanyInfo: The company's new updated info.
  changeScreen(companyUpdated, newCompanyInfo) {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'canvas.CompanyInfo',
        passProps: {
          companyUpdated: companyUpdated,
          family: newCompanyInfo ? newCompanyInfo : this.state.company
        },
        options: {
          topBar: {
            visible: false
          }
        }
      }
    });
  }

  // Prepares data to be sent to the API.
  // <params> data: Data to be formatted.
  formatFormData(data) {
    let formData = [];
    for (let property in data) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(data[property]);
      formData.push(encodedKey + '=' + encodedValue);
    }
    formData = formData.join('&');
    return formData;
  }

  // Handles company info update process.
  updateCompanyInfo() {
    if (!this.canEdit()) {
      Toast.show({
        text: 'Please fill the empty fields!',
        buttonText: 'Ok',
        duration: 3000,
        type: 'danger'
      });
      return;
    }

    this.setState({ isLoading: true });

    let data = {
      name: this.state.companyName,
      website: this.state.companyWebsite
    };

    axios
      .put(
        `/companies/${this.state.company.id}`,
        this.formatFormData(data)
      )
      .then(response => {
        if (this.props.selectedCompany.id == response.data.id) {
          this.props.changeActiveCompany({ company: response.data });
        }
        this.changeScreen(true, response.data);
      })
      .catch(error => {
        this.setState({ isLoading: false });
        Toast.show({
          text: error.response.data.errors.message
            ? error.response.data.errors.message
            : 'Error',
          buttonText: 'Ok',
          duration: 3000,
          type: 'danger'
        });
      });
  }

  // Defines title bar's body content.
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
            {this.state.company.name}
          </Text>
        </View>
      )
    };
  }

  // Defines title bar's left content.
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

  // Defines title bar's right content.
  titleBarRight() {
    return {
      content: (
        <View style={StyleSheet.titleBarContent}>
          <TouchableOpacity
            onPress={() => {
              this.updateCompanyInfo();
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
              Save
            </Text>
          </TouchableOpacity>
        </View>
      )
    };
  }

  // Gets the company's image cover.
  getImageCover() {
    return this.state.company.profile_image
      ? this.state.company.profile_image
      : 'https://d3bza9ldbeb18h.cloudfront.net/assets/placeholder-company-b9d0a167b1f7460768517d115285de2337c6e2a84f4285617722efa587c693fc.png';
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
                    value={this.state.companyName}
                    autoCapitalize
                    onChangeText={name => this.setState({ companyName: name })}
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
                    autoCapitalize={false}
                    value={this.state.companyWebsite}
                    onChangeText={website =>
                      this.setState({ companyWebsite: website })
                    }
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

// Maps redux's state variables to this class' props.
const mapStateToProps = state => {
  return {
    token: state.session.token,
    user: state.session.user,
    selectedCompany: state.session.company
  };
};

// Connects redux actions to this class' props.
export default connect(
  mapStateToProps,
  {
    changeActiveCompany
  }
)(EditCompany);
