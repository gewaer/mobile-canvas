// Importing package modules.
import React, { Component } from 'react';

import {
  View,
  ImageBackground,
  Linking,
  AsyncStorage,
  Platform,
  TouchableOpacity,
  BackHandler,
  Keyboard
} from 'react-native';

import {
  Button,
  Title,
  Text,
  Content,
  Container,
  Form,
  Item,
  Input,
  Label,
  Spinner,
  Icon,
  Root,
  Toast
} from 'native-base';

import { Navigation } from 'react-native-navigation';

import { connect } from 'react-redux';

// Importing local assets and components.
import { appImages } from '../../config/imagesRoutes';
import TitleBar from '../../components/title-bar';
import { FORGOT_PASSWORD_URL, GOOGLE_CLIENT_ID } from 'react-native-dotenv';

import {
  globalStyle,
  colors
} from '../../config/styles';

import { pushDashboard } from '../../navigation/flows'

import StyleSheet from './stylesheet'

import { LoginManager, GraphRequest,GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';

// Importing Redux's actions
import {
  changeActiveScreen,
  changeSessionToken,
  changeUser,
  changeActiveCompany
} from '../../actions/SessionActions';

const axios = require('../../../src/config/axios');

// Gets the operating system's name where the app is running (Android or iOS).
const platform = Platform.OS;

/*
	Screen Name: Login.
	Description: This screen is used to let the user log in with his/her email or with social options.
*/
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isLoading: false,
      isLoginIn: false
    };
  }

  componentDidMount() {
    // Creates an event listener for Android's back button
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/plus.login'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: GOOGLE_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true
    });
  }

  // Handles Android's back button's action
  backAndroid() {
    this.pushScreen('canvas.Welcome');
    return true;
  }

  // Changes the active screen using redux.
  changeScreen(activeScreen) {
    this.props.changeActiveScreen({ activeScreen });
    pushDashboard({ activeScreen: 'canvas.Dashboard' });
  }

  // Pushes to another screen in the navigator stack.
  pushScreen(activeScreen) {
    Navigation.push(this.props.componentId, {
      component: {
        name: activeScreen,
        options: {
          topBar: {
            visible: false
          }
        }
      }
    });
  }

  // Defines title bar's left content
  titleBarLeft() {
    return {
      content: (
        <View>
          <TouchableOpacity
            transparent
            onPress={() => this.pushScreen('canvas.Welcome')}
          >
            <Icon
              type={'Ionicons'}
              name={'md-arrow-back'}
              style={{ color: colors.brandPrimary, fontSize: 30, marginLeft: 5 }}
            />
          </TouchableOpacity>
        </View>
      )
    };
  }

  // Defines title bar's body content
  titleBarBody() {
    return {
      content: (
        <View>
        </View>
      )
    };
  }

  // Process LogIn
  logIn() {
    Keyboard.dismiss();
    if (this.state.username && this.state.password) {
      this.setState({ isLoginIn: true });
      let formData = new FormData();
      formData.append('email', this.state.username);
      formData.append('password', this.state.password);

      axios
        .post(`/auth`, formData)
        .then(response => {
          this.saveSessionData('sessionData', JSON.stringify(response.data));
          this.props.changeSessionToken({ token: response.data.token });
          this.getUserInfo(response.data.id, response.data.token);
        })
        .catch(error => {
          this.setState({ isLoginIn: false });
          Toast.show({
            text: error.response.data.errors.message
              ? error.response.data.errors.message
              : 'Error',
            buttonText: 'Ok',
            duration: 3000,
            type: 'danger'
          });
        });
    } else {
      Toast.show({
        text: 'Email and password are required!',
        buttonText: 'Ok',
        duration: 3000,
        type: 'danger'
      });
    }
  }

  // Saves user's session data in the local storage.
  async saveSessionData(item, value) {
    try {
      await AsyncStorage.setItem(item, value);
      let data = JSON.parse(await AsyncStorage.getItem(item));
      if (data) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Logs user in dev mode
  logInDevMode() {
    this.setState({ isLoginIn: true });
    let formData = new FormData();
    formData.append('email', 'max@mctekk.com');
    formData.append('password', 'nosenose');

    axios
      .post(`/auth`, formData)
      .then(response => {
        this.saveSessionData('sessionData', JSON.stringify(response.data));
        this.props.changeSessionToken({ token: response.data.token });
        this.getUserInfo(response.data.id, response.data.token);
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoginIn: false });
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

  // Tries to get the user's information using the stored token.
  // If the response is an error then the token is expired and removes the session data.
  getUserInfo(userId) {
    axios
      .get(`/users/${userId}`)
      .then(response => {
        this.props.changeUser({ user: response.data });
        this.getUserDefaultCompany(response.data.default_company);
      })
      .catch(error => {
        this.setState({ isLoginIn: false });
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

  // Gets user's default company.
  getUserDefaultCompany(companyId) {
    axios
      .get(`/companies?q=(id:${companyId})`)
      .then(response => {
        this.props.changeActiveCompany({ company: response.data[0] });
        this.changeScreen('dashboard');
      })
      .catch(error => {
        this.setState({ isLoginIn: false });
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

  signInWithFacebookAsync = async () => {
    LoginManager.logInWithReadPermissions(["email"]).then(loginState => {
          if (loginState.isCancelled) {
          } else {
              const infoRequest = new GraphRequest('/me?fields=name,picture,email', null,(error, user) => {
                  console.log(user)
                  if (error) {
                      console.log('Error fetching data: ' + error.toString());
                  } else {
                      const userData = new FormData();
                      userData.append('email', user.email);
                      userData.append('social_id', user.id);

                      this.saveItem('email', user.email);
                      this.saveItem('social_id', user.id);

                      axios.post(`/auth`, userData).then(({ data: login }) => {
                          if (login.token) {
                              this.saveItem('login_type', 'facebook');
                              this.saveItem('id_token', login.token);
                              this.saveItem('user_id', login.id.toString());

                              this.props.saveFacebookLoginData({
                                  userEmail: user.email,
                                  userSessionToken: login.token,
                                  userId: login.id.toString(),
                                  socialId: user.id,
                                  loginType: 'facebook'
                              })

                              this.changeScreen('dashboard');
                          }
                      }).catch(error => {
                          console.log(error.response);
                          Alert.alert("Your email is not associated with an account.")
                      });
                  }
              });
              new GraphRequestManager().addRequest(infoRequest).start();
          }
      }, error => {
        console.log(error);
          Alert.alert("Error while trying to authenticate with your Facebook account.")
      }
    );
  }

  signInWithGoogleAsync = async () => {
      GoogleSignin.hasPlayServices().then(() => {
        GoogleSignin.signIn().then(result => {
            console.log(result)
            if (result.accessToken) {
              var data = new FormData();
              data.append('email', result.user.email);
              data.append('social_id', result.user.id);
              this.saveItem('social_id', result.user.id);
              this.saveItem('code', result.serverAuthCode);
              this.saveItem('email', result.user.email);
              //data.append('access_token', result.accessToken);
              //data.append('refresh_token', result.refreshToken);
              //data.append('code', result.serverAuthCode);

              axios.post(`/auth`, data)
              .then(response => {
                if (response.data.token) {
                  this.saveItem('login_type', 'google');
                  this.saveItem('id_token', response.data.token);
                  this.saveItem('user_id', response.data.id.toString());

                  this.props.saveGoogleLoginData({
                      userEmail: result.user.email,
                      userSessionToken: response.data.token,
                      userId: response.data.id.toString(),
                      socialId: result.user.id,
                      loginType: 'google',
                      serverAuthCode: result.serverAuthCode
                  })
                  this.changeScreen('dashboard');
                }
              })
              .catch(function (error) {
                console.log(error.response);
              });
            }
        });
      }).catch (error => {
        console.log("ERROR")
        console.log(JSON.stringify(error))
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    })
  };

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  googleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <Root>
        <Container>
          <TitleBar
            noShadow
            left={this.titleBarLeft()}
            body={this.titleBarBody()}
            backgroundColor="white"
          />
          <Content style={{ backgroundColor: 'white' }}>
            {this.state.isLoading ? (
              <Spinner color={colors.brandPrimary} />
            ) : (
              <View>
                <View style={StyleSheet.containerView}>
                  <View style={StyleSheet.topContainerView}>
                    <Text
                      style={ StyleSheet.title }
                    >
                      Login
                    </Text>
                    <Form style={{ marginHorizontal: 24 }}>
                      <Text style={globalStyle.formLabel}>Email</Text>
                      <Item
                        floatingLabel
                        last
                        style={ StyleSheet.formItem }
                      >
                        <Input
                          onChangeText={userName =>
                            this.setState({ username: userName })
                          }
                          style={globalStyle.formInput}
                          keyboardType={'email-address'}
                          autoCapitalize={'none'}
                          onSubmitEditing={() => {
                            this._inputDesc._root.focus();
                          }}
                        />
                      </Item>
                      <Text style={globalStyle.formLabel}>Password</Text>
                      <Item floatingLabel last style={StyleSheet.formItem}>
                        <Input
                          onChangeText={password =>
                            this.setState({ password: password })
                          }
                          style={globalStyle.formInput}
                          secureTextEntry
                          autoCapitalize={'none'}
                          getRef={(input) => this._inputDesc = input}
                          onSubmitEditing={() => {
                            this.logIn();
                          }}
                        />
                      </Item>
                    </Form>
                  </View>
                  {this.state.isLoginIn ? (
                    <Spinner color={colors.brandPrimary} />
                  ) : (
                    <Button
                      block
                      bordered
                      primary
                      onPress={() => this.logIn()}
                      style={[StyleSheet.submitBtn ]}
                    >
                      <Text style={ StyleSheet.buttonText }>
                        Enter Account
                      </Text>
                    </Button>
                  )}
                  {__DEV__ && !this.state.isLoginIn && (
                    <Button
                      block
                      bordered
                      primary
                      style={StyleSheet.submitBtn}
                      onPress={() => this.logInDevMode()}
                    >
                      <Text style={ StyleSheet.buttonText }>
                        Development Mode
                      </Text>
                    </Button>
                  )}

                  {/* {!this.state.isLoginIn && (
                    <View>
                      <Button transparent block>
                        <Text
                          style={StyleSheet.linkBTN}
                          onPress={() =>
                            Linking.openURL(FORGOT_PASSWORD_URL)
                          }
                        >
                          Forgot Password?
                        </Text>
                      </Button>
                    </View>
                  )} */}
                  <Text style={StyleSheet.textLabel}>
                    Use Social Logins
                  </Text>
                  <View style={StyleSheet.btnContainer}>
                    <Button
                      block
                      style={[StyleSheet.submitBtnInv, { width: 155 }]}
                      onPress={() => this.signInWithGoogleAsync()}
                    >
                      <Text style={StyleSheet.buttonTextPrimary}>
                          Gmail
                      </Text>
                    </Button>
                    <Button
                      block
                      style={[StyleSheet.submitBtn, { width: 155 }]}
                      onPress={() => this.signInWithFacebookAsync()}
                    >
                      <Text style={StyleSheet.buttonText}>
                          Facebook
                      </Text>
                    </Button>
                    {/* <Button
                      block
                      style={[StyleSheet.googleBtn, {marginTop: 20}]}
                      onPress={() => this.googleSignOut()}
                    >
                      <Text style={StyleSheet.googleText}>
                          Google Sign Out
                      </Text>
                    </Button> */}
                  </View>
                </View>
              </View>
            )}
          </Content>
        </Container>
      </Root>
    );
  }
}

// Maps redux's state variables to this class' props
const mapStateToProps = state => {
  return {

  };
};

// Connects redux actions to this class' props
export default connect(mapStateToProps, {
  changeActiveScreen,
  changeSessionToken,
  changeUser,
  changeActiveCompany
})(Login);
