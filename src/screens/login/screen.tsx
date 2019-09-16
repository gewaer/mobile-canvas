// Importing package modules.
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  BackHandler,
  Keyboard
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Button,
  Text,
  Content,
  Container,
  Form,
  Item,
  Input,
  Spinner,
  Icon,
  Root,
  Toast
} from "native-base";
import { connect } from "react-redux";
import TitleBar from "@components/title-bar";
import { FORGOT_PASSWORD_URL, GOOGLE_CLIENT_ID } from "react-native-dotenv";
import { globalStyle, colors } from "@config/styles";
import { pushDashboard } from "@config/flows"
import StyleSheet from "./stylesheet"
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import { GoogleSignin, statusCodes } from "react-native-google-signin";
import {
  changeSessionToken,
  changeUser,
  changeActiveCompany
} from "@modules/Session";
import { popScreen } from "@utils/nav";
import axios from "@config/axios";
import { IState, IProps } from "./types";
import { AxiosResponse, AxiosError } from "axios";
import has from "lodash/has";


/*
	Screen Name: Login.
	Description: This screen is used to let the user log in with his/her email or with social options.
*/
class Login extends Component<IProps, IState> {

  state = {
    username: "",
    password: "",
    isLoading: false,
    isLoginIn: false
  };

  componentDidMount() {
    // Creates an event listener for Android's back button
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid());
    GoogleSignin.configure({
      // What API you want to access on behalf of the user, default is email and profile
      scopes: ["https://www.googleapis.com/auth/plus.login"],
      // Client ID of type WEB for your server (needed to verify user ID and offline access)
      webClientId: GOOGLE_CLIENT_ID,
      offlineAccess: true
    });
  }

  // Handles Android's back button's action
  backAndroid() {
    popScreen(this.props.componentId);
    return true;
  }

  // Defines title bar's left content
  titleBarLeft() {
    return {
      content: (
        <TouchableOpacity onPress={() => popScreen(this.props.componentId)}>
          <Icon
            type={"Ionicons"}
            name={"md-arrow-back"}
            style={{ color: colors.brandPrimary, fontSize: 30, marginLeft: 5 }}
          />
        </TouchableOpacity>
      )
    };
  }

  // Defines title bar's body content
  titleBarBody() {
    return {
      content: <View />
    };
  }

  setNotification(message: string, type: string = "danger") {
    Toast.show({
      text: message,
      buttonText: "Ok",
      duration: 3000,
      type
    });
  }

  // Process LogIn
  logIn() {
    Keyboard.dismiss();
    if (this.state.username && this.state.password) {
      this.setState({ isLoginIn: true });
      const formData = new FormData();
      formData.append("email", this.state.username);
      formData.append("password", this.state.password);

      axios
        .post(`/auth`, formData)
        .then(({ data }: AxiosResponse) => {
          this.saveSessionData("sessionData", JSON.stringify(data));
          this.props.changeSessionToken({ token: data.token });
          this.getUserInfo(data.id);
        })
        .catch((error: AxiosError) => {
          this.setState({ isLoginIn: false });
          // console.log(error.response);
          Toast.show({
            text: has(error, "response.data.errors.message")
              ? error.response.data.errors.message
              : "Error",
            buttonText: "Ok",
            duration: 3000,
            type: "danger"
          });
        });
    } else {
      this.setNotification("Email and password are required!");
    }
  }

  // Saves user's session data in the local storage.
  async saveSessionData(item: string, value: string) {
    try {
      await AsyncStorage.setItem(item, value);
      const data = JSON.parse(await AsyncStorage.getItem(item));
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
    const formData = new FormData();
    formData.append("email", "max@mctekk.com");
    formData.append("password", "nosenose");

    axios
      .post(`/auth`, formData)
      .then((response: AxiosResponse) => {
        AsyncStorage.setItem("sessionData", JSON.stringify(response.data)).then(
          () => {
            this.props.changeSessionToken({ token: response.data.token });
            this.getUserInfo(response.data.id);
          }
        );
      })
      .catch((error: AxiosError) => {
        this.setState({ isLoginIn: false });
        console.clear();
        console.log(error);
        this.setNotification(has(error, "response.data.errors.message") ?
          error.response.data.errors.message
          :
          "Error"
        );
      });
  }

  // Tries to get the user's information using the stored token.
  // If the response is an error then the token is expired and removes the session data.
  getUserInfo(userId: string) {
    axios
      .get(`/users/${userId}`)
      .then((response: AxiosResponse) => {
        this.props.changeUser({ user: response.data });
        this.getUserDefaultCompany(response.data.default_company);
      })
      .catch((error: AxiosError) => {
        this.setState({ isLoginIn: false });
        console.log("get info", error);
        this.setNotification(has(error, "response.data.errors.message") ?
          error.response.data.errors.message
          :
          "Error"
        );
      });
  }

  // Gets user's default company.
  getUserDefaultCompany(companyId: string) {
    axios
      .get(`/companies?q=(id:${companyId})`)
      .then((response: AxiosResponse) => {
        this.props.changeActiveCompany({ company: response.data[0] });
        pushDashboard();
      })
      .catch((error: AxiosError) => {
        this.setState({ isLoginIn: false });
        console.log("get info", error);
        this.setNotification(has(error, "response.data.errors.message") ?
          error.response.data.errors.message
          :
          "Error"
        );
      });
  }

  signInWithFacebookAsync = async () => {
    LoginManager.logInWithReadPermissions(["email"]).then(
      loginState => {
        if (loginState.isCancelled) {
          return;
        } else {
          const infoRequest = new GraphRequest(
            "/me?fields=name,picture,email",
            null,
            (error, user) => {
              if (error) {
                console.log("Error fetching data: " + error.toString());
              } else {
                const userData = new FormData();
                userData.append("email", user.email);
                userData.append("social_id", user.id);

                this.saveItem("email", user.email);
                this.saveItem("social_id", user.id);

                axios
                  .post(`/auth`, userData)
                  .then(({ data: login }) => {
                    if (login.token) {
                      this.saveItem("login_type", "facebook");
                      this.saveItem("id_token", login.token);
                      this.saveItem("user_id", login.id.toString());

                      this.props.saveFacebookLoginData({
                        userEmail: user.email,
                        userSessionToken: login.token,
                        userId: login.id.toString(),
                        socialId: user.id,
                        loginType: "facebook"
                      });

                      pushDashboard();
                    }
                  })
                  .catch(error => {
                    console.log(error.response);
                    Alert.alert(
                      "Your email is not associated with an account."
                    );
                  });
              }
            }
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      },
      error => {
        console.log(error);
        Alert.alert(
          "Error while trying to authenticate with your Facebook account."
        );
      }
    );
  };

  signInWithGoogleAsync = async () => {
    GoogleSignin.hasPlayServices()
      .then(() => {
        GoogleSignin.signIn().then(result => {
          if (result.accessToken) {
            var data = new FormData();
            data.append("email", result.user.email);
            data.append("social_id", result.user.id);
            this.saveItem("social_id", result.user.id);
            this.saveItem("code", result.serverAuthCode);
            this.saveItem("email", result.user.email);
            //data.append('access_token', result.accessToken);
            //data.append('refresh_token', result.refreshToken);
            //data.append('code', result.serverAuthCode);

            axios
              .post(`/auth`, data)
              .then(response => {
                if (response.data.token) {
                  this.saveItem("login_type", "google");
                  this.saveItem("id_token", response.data.token);
                  this.saveItem("user_id", response.data.id.toString());

                  this.props.saveGoogleLoginData({
                    userEmail: result.user.email,
                    userSessionToken: response.data.token,
                    userId: response.data.id.toString(),
                    socialId: result.user.id,
                    loginType: "google",
                    serverAuthCode: result.serverAuthCode
                  });
                  pushDashboard();
                }
              })
              .catch(function(error) {
                console.log(error.response);
              });
          }
        });
      })
      .catch(error => {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (f.e. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      });
  };

  async saveItem(item: string, selectedValue: string) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error("AsyncStorage error: " + error.message);
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
          <Content style={{ backgroundColor: "white" }}>
            {this.state.isLoading ? (
              <Spinner color={colors.brandPrimary} />
            ) : (
              <View>
                <View style={StyleSheet.containerView}>
                  <View style={StyleSheet.topContainerView}>
                    <Text style={StyleSheet.title}>Login</Text>
                    <Form style={{ marginHorizontal: 24 }}>
                      <Text style={globalStyle.formLabel}>Email</Text>
                      <Item floatingLabel last style={StyleSheet.formItem}>
                        <Input
                          onChangeText={userName =>
                            this.setState({ username: userName })
                          }
                          style={globalStyle.formInput}
                          keyboardType={"email-address"}
                          autoCapitalize={"none"}
                          onSubmitEditing={() => {
                            this._inputDesc._root.focus();
                          }}
                        />
                      </Item>
                      <Text style={globalStyle.formLabel}>Password</Text>
                      <Item floatingLabel last style={StyleSheet.formItem}>
                        <Input
                          onChangeText={password =>
                            this.setState({ password })
                          }
                          style={globalStyle.formInput}
                          secureTextEntry
                          autoCapitalize={"none"}
                          getRef={input => (this._inputDesc = input)}
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
                      style={[StyleSheet.submitBtn]}
                    >
                      <Text style={StyleSheet.buttonText}>Enter Account</Text>
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
                      <Text style={StyleSheet.buttonText}>
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
                  <Text style={StyleSheet.textLabel}>Use Social Logins</Text>
                  <View style={StyleSheet.btnContainer}>
                    <Button
                      block
                      style={[StyleSheet.googleBtn, { width: 155 }]}
                      onPress={() => this.signInWithGoogleAsync()}
                    >
                      <Text style={StyleSheet.googleText}>Gmail</Text>
                    </Button>
                    <Button
                      block
                      style={[StyleSheet.facebookBtn, { width: 155 }]}
                      onPress={() => this.signInWithFacebookAsync()}
                    >
                      <Text style={StyleSheet.buttonText}>Facebook</Text>
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
const mapStateToProps = (state: any) => {
  return {
    token: state.session.token
  };
};

const mapDispatchToProps = {
  changeSessionToken,
  changeUser,
  changeActiveCompany
}

// Connects redux actions to this class' props
export default connect(mapStateToProps, mapDispatchToProps)(Login);
