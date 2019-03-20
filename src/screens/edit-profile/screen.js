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
  Text,
  Icon,
  Label,
  Item,
  Input,
  Content,
  Container,
  Spinner,
  Picker,
  Root,
  Toast,
  Thumbnail
} from 'native-base';

import { colors } from '../../config/styles';
import { changeActiveCompany } from '../../actions/SessionActions';
import { connect } from 'react-redux';
const axios = require('../../../src/config/axios');
// import ImagePicker from 'react-native-image-crop-picker';

import TitleBar from '../../components/title-bar'

const platform = Platform.OS;

import StyleSheet from './stylesheet'

import { Navigation } from 'react-native-navigation';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      userName: '',
      userLastName: '',
      userEmail: '',
      userPassword: '',
      userDefaultFamily: '',
      userFamilies: [],
      initialPassword: '',
      passwordVisible: false,
      profilePicture: {
        path:
          'https://banner2.kisspng.com/20180406/sve/kisspng-computer-icons-user-material-design-business-login-dizzy-5ac7f1c61041c2.5160856515230529980666.jpg'
      }
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
    const { userInfo } = this.props;
    this.setState({
      userName: userInfo.firstname,
      userLastName: userInfo.lastname,
      userEmail: userInfo.email,
      userPassword: userInfo.password,
      userDefaultFamily: userInfo.default_company,
      userFamilies: this.props.userFamilies,
      initialPassword: userInfo.password,
      isLoading: false
    });
  }

  backAndroid() {
    this.returnToProfileScreen();
    return true;
  }

  capitalizeFilter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  uncapitalizeFilter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  openImagePicker() {
    console.log('Picker to be implemented');
    // ImagePicker.openPicker({
    //   multiple: false
    // }).then(images => {
    //   this.setState({ profilePicture: images });
    // });
  }

  changeActiveFamily(family) {
    console.log('Company Id: ', family.id);
    //this.setState({ isLoading: true })
    this.props.changeActiveCompany({ company: family });
  }

  changeScreen(infoChanged) {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'canvas.Profile',
        passProps: {
          profileInfoChanged: infoChanged
        },
        options: {
          topBar: {
            visible: false
          }
        }
      }
    });
  }

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

  getOptions(items) {
    //items = items.sort(this.sortByName);
    const optionsItems = items.map((item, i) => {
      if (item) {
        if (typeof item !== 'object') {
          return <Picker.item key={i} label={String(item)} value={item} />;
        } else {
          return (
            <Picker.item key={i} label={String(item.name)} value={item.id} />
          );
        }
      }
    });
    return optionsItems;
  }

  getDefaultFamilyName() {
    let defaultFamily = this.state.userFamilies.find(family => {
      return family.id == this.state.userDefaultFamily;
    });
    return defaultFamily;
  }

  sortByName(a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  }

  titleBarLeft() {
    return {
      content: (
        <View style={StyleSheet.titleBarContent}>
          <Button transparent onPress={() => this.returnToProfileScreen()}>
            <Icon
              type={'MaterialIcons'}
              name={'chevron-left'}
              style={{ color: '#fff', fontSize: 22 }}
            />
          </Button>
        </View>
      )
    };
  }

  returnToProfileScreen() {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'canvas.Profile',
        options: {
          topBar: {
            visible: false
          }
        }
      }
    });
  }

  canEdit() {
    return (
      this.state.userName &&
      this.state.userLastName &&
      this.state.userEmail &&
      this.state.userPassword
    );
  }

  updateUserInfo() {
    if (!this.canEdit()) {
      Toast.show({
        text: '¡Por favor, llene los campos vacíos!',
        buttonText: 'Ok',
        duration: 3000,
        type: 'danger'
      });
      return;
    }

    this.setState({ isLoading: true });

    let data = {
      firstname: this.state.userName,
      lastname: this.state.userLastName,
      email: this.state.userEmail,
      password: this.state.userPassword,
      default_company: this.state.userDefaultFamily
    };

    axios
      .put(
        `https://apidev.ahorrando.la/v1/users/${this.props.userInfo.id}`,
        this.formatFormData(data)
      )
      .then(response => {
        let userSelectedFamilty = this.getDefaultFamilyName();
        if (userSelectedFamilty) {
          this.changeActiveFamily(userSelectedFamilty);
        }
        this.changeScreen(true);
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  titleBarRight() {
    return {
      content: (
        <View style={[StyleSheet.titleBarContent, { minHeight: 45 }]}>
          <TouchableOpacity onPress={() => this.updateUserInfo()}>
            <Text style={{ color: '#fff', paddingLeft: 0, fontSize: 16 }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      )
    };
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Container>
          <Root>
            <TitleBar left={this.titleBarLeft()} body={titleBarbody} />
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
        <Root>
          <Container style={{ paddingBottom: 10 }}>
            <TitleBar
              left={this.titleBarLeft()}
              body={titleBarbody}
              right={this.titleBarRight()}
            />
            <Content padder>
              <View style={StyleSheet.positionR}>
                <View style={StyleSheet.container}>
                  <TouchableOpacity onPress={() => this.openImagePicker()}>
                    <Thumbnail
                      source={{
                        uri: this.state.profilePicture.sourceURL
                          ? this.state.profilePicture.sourceURL
                          : this.state.profilePicture.path
                      }}
                      style={{ width: 120, height: 120 }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                </View>
                <Item
                  stackedLabel
                  style={StyleSheet.formItem}
                  error={!this.state.userName}
                >
                  <Label
                    style={[
                      StyleSheet.formLabel,
                      {
                        fontSize: 12,
                        color: this.state.userName ? colors.brandBlack : 'red'
                      }
                    ]}
                  >
                    Name
                  </Label>
                  <Input
                    style={StyleSheet.formInput}
                    value={this.capitalizeFilter(this.state.userName)}
                    onChangeText={name => this.setState({ userName: name })}
                  />
                </Item>
                <Item
                  stackedLabel
                  style={StyleSheet.formItem}
                  error={!this.state.userLastName}
                >
                  <Label
                    style={[
                      StyleSheet.formLabel,
                      {
                        fontSize: 12,
                        color: this.state.userLastName
                          ? colors.brandBlack
                          : 'red'
                      }
                    ]}
                  >
                    Lastname
                  </Label>
                  <Input
                    style={StyleSheet.formInput}
                    value={this.capitalizeFilter(this.state.userLastName)}
                    onChangeText={lastName =>
                      this.setState({ userLastName: lastName })
                    }
                  />
                </Item>
                <Item
                  stackedLabel
                  style={StyleSheet.formItem}
                  error={!this.state.userEmail}
                >
                  <Label
                    style={[
                      StyleSheet.formLabel,
                      {
                        fontSize: 12,
                        color: this.state.userEmail ? colors.brandBlack : 'red'
                      }
                    ]}
                  >
                    Email
                  </Label>
                  <Input
                    style={StyleSheet.formInput}
                    value={this.state.userEmail}
                    onChangeText={email => this.setState({ userEmail: email })}
                  />
                </Item>
                <View>
                  <Item
                    stackedLabel
                    style={StyleSheet.formItem}
                    error={!this.state.userPassword}
                  >
                    <Label
                      style={[
                        StyleSheet.formLabel,
                        {
                          fontSize: 12,
                          color: this.state.userPassword
                            ? colors.brandBlack
                            : 'red'
                        }
                      ]}
                    >
                      Password
                    </Label>
                    <Input
                      style={StyleSheet.formInput}
                      value={this.state.userPassword}
                      onChangeText={password =>
                        this.setState({ userPassword: password })
                      }
                      secureTextEntry={!this.state.passwordVisible}
                    />
                  </Item>

                  <Icon
                    onPress={() =>
                      this.setState({
                        passwordVisible: !this.state.passwordVisible
                      })
                    }
                    type={'Ionicons'}
                    name={
                      this.state.passwordVisible ? 'ios-eye' : 'ios-eye-off'
                    }
                    style={{ position: 'absolute', right: 10, bottom: 10 }}
                  />
                </View>

                {this.state.initialPassword !== this.state.userPassword && (
                  <Item
                    stackedLabel
                    style={StyleSheet.formItem}
                    error={
                      !this.state.confirmPassword ||
                      this.state.confirmPassword != this.state.userPassword
                    }
                  >
                    <Label
                      style={[
                        StyleSheet.formLabel,
                        {
                          fontSize: 12,
                          color:
                            !this.state.confirmPassword ||
                            this.state.confirmPassword !=
                              this.state.userPassword
                              ? 'red'
                              : colors.brandBlack
                        }
                      ]}
                    >
                      Confirm Password
                    </Label>
                    <Input
                      style={StyleSheet.formInput}
                      value={this.state.confirmPassword}
                      secureTextEntry
                      onChangeText={confirmPassword =>
                        this.setState({
                          confirmPassword: this.uncapitalizeFilter(
                            confirmPassword
                          )
                        })
                      }
                    />
                  </Item>
                )}
                <View
                  style={{
                    width: '100%',
                    borderBottomColor: '#D9D5DC',
                    borderBottomWidth: 0.5
                  }}
                >
                  <Label
                    style={[
                      StyleSheet.formLabel,
                      { fontSize: 12, color: colors.brandBlack, marginTop: 10 }
                    ]}
                  >
                    Default Company
                  </Label>
                  <Picker
                    mode="dropdown"
                    iosIcon={
                      <Icon
                        type={'Ionicons'}
                        name={'ios-arrow-down'}
                        style={{ padding: 10, fontSize: 14 }}
                      />
                    }
                    placeholderIconColor={colors.brandBlack}
                    placeholder="ELEGIR"
                    placeholderStyle={{
                      color: colors.brandGrey,
                      paddingLeft: 0
                    }}
                    style={{
                      width: '100%',
                      borderBottomWidth: 0.5,
                      borderBottomColor: colors.brandGrey
                    }}
                    selectedValue={this.state.userDefaultFamily}
                    onValueChange={family =>
                      this.setState({ userDefaultFamily: family })
                    }
                  >
                    {this.getOptions(this.state.userFamilies)}
                  </Picker>
                </View>
              </View>
            </Content>
          </Container>
        </Root>
      );
    }
  }
}

const titleBarbody = {
  content: (
    <View style={StyleSheet.titleBarContent}>
      <Text style={{ color: '#fff', paddingLeft: platform === 'ios' ? 0 : 10, fontSize: platform === 'ios' ? 18 : 19.64 }}>
        Editar Perfil
      </Text>
    </View>
  )
};

const mapStateToProps = state => {
  return {
    token: state.session.token,
    user: state.session.user,
    company: state.session.company
  };
};

export default connect(mapStateToProps, {
  changeActiveCompany
})(EditProfile);
